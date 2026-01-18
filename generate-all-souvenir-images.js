const fs = require('fs');
const path = require('path');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');

// --- CONFIGURATION ---
const PROJECT_ID = 'jocoding-week1-04038098-1c9c8';
const LOCATION = 'us-central1';
const MODEL_ID = 'imagegeneration@006'; // Using a stable version of Imagen
const OUTPUT_DIR = './public/images';
const MAIN_JS_PATH = './main.js'; // Path to main.js to extract souvenir data

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const predictionServiceClient = new PredictionServiceClient(clientOptions);

// Function to read souvenirs from main.js
function getSouvenirs() {
  const mainJsContent = fs.readFileSync(MAIN_JS_PATH, 'utf8');
  const startMarker = 'const souvenirs = [';
  const endMarker = '];';

  const startIndex = mainJsContent.indexOf(startMarker);
  if (startIndex === -1) {
    console.error('Could not find start marker for souvenirs array in main.js.');
    return [];
  }

  // Find the matching closing bracket ']' after the start marker
  // We need to account for nested brackets, but for a simple array of objects,
  // finding the next '];' should be sufficient if there are no nested array definitions at the top level
  let bracketCount = 0;
  let endIndex = -1;
  // Start from just before the first '[' to correctly count
  for (let i = startIndex + 'const souvenirs = '.length; i < mainJsContent.length; i++) {
    if (mainJsContent[i] === '[') {
      bracketCount++;
    } else if (mainJsContent[i] === ']') {
      bracketCount--;
    }
    if (bracketCount === 0 && mainJsContent.substring(i, i + 2) === '];') { // Check for '];' specifically
        endIndex = i;
        break;
    }
  }

  if (endIndex === -1) {
    console.error('Could not find end marker for souvenirs array in main.js.');
    return [];
  }

  const jsonLikeString = mainJsContent.substring(
    startIndex + 'const souvenirs = '.length -1, // Include the opening '['
    endIndex + 1 // Include the closing ']'
  );

  try {
    // Use eval carefully, assuming main.js is trusted.
    // A more robust solution for production would involve parsing the JS AST.
    const souvenirs = eval(jsonLikeString);
    return souvenirs;
  } catch (e) {
    console.error('Error parsing souvenirs array from main.js:', e);
    // console.error('Problematic string:', jsonLikeString); // Uncomment for debugging
    return [];
  }
}

// Function to convert Korean name to a slug for filename
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\uAC00-\uD7A3a-z0-9-]/g, '') // Keep Korean, lowercase alphanumeric, and hyphens
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

async function generateImageForSouvenir(souvenir) {
  const koName = souvenir.name.ko;
  const slugName = slugify(koName);
  const outputFile = path.join(OUTPUT_DIR, `${slugName}.jpg`);

  // Skip if image already exists
  if (fs.existsSync(outputFile)) {
    console.log(`Image for "${koName}" already exists at ${outputFile}. Skipping.`);
    return;
  }

  console.log(`--- Starting Image Generation for "${koName}" ---`);

  const endpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}`;

  const promptText = `high resolution photo of ${koName} (Korean souvenir), studio quality, 400x400, clear background, product photography`;
  const prompt = {
    prompt: promptText,
  };
  const instanceValue = helpers.toValue(prompt);
  const instances = [instanceValue];

  const parameter = {
    sampleCount: 1,
  };
  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    instances,
    parameters,
  };

  try {
    console.log(`Sending request to Vertex AI for "${koName}"...`);
    const [response] = await predictionServiceClient.predict(request);
    console.log(`Received response for "${koName}".`);

    const predictions = response.predictions;
    if (!predictions || predictions.length === 0) {
      console.error(`No predictions returned from the API for "${koName}".`);
      return;
    }

    const imageBase64 = predictions[0].structValue.fields.bytesBase64Encoded.stringValue;

    if (!imageBase64) {
      console.error(`Could not find image data in the API response for "${koName}".`);
      return;
    }
    
    console.log(`Decoding base64 image and saving to ${outputFile}...`);
    fs.writeFileSync(outputFile, Buffer.from(imageBase64, 'base64'));
    console.log(`✅ Successfully saved image for "${koName}" to ${outputFile}`);
    return slugName + '.jpg'; // Return the filename
  } catch (error) {
    console.error(`--- ERROR DURING IMAGE GENERATION for "${koName}" ---`);
    console.error(error.message || error);
    if (error.details) {
        console.error('Error Details:', error.details);
    }
    return null;
  }
}

async function main() {
  const allSouvenirs = getSouvenirs();
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const generatedImageMap = {}; // To store generated filenames

  for (const souvenir of allSouvenirs) {
    const koName = souvenir.name.ko;

    // Skip the 3 hardcoded images from main.js as they already exist
    if (koName === '김치' || koName === '고추장' || koName === '된장') {
        console.log(`Skipping "${koName}" as it has a hardcoded image.`);
        continue;
    }

    // Check if the souvenir already has an imageUrl (for re-runs)
    if (souvenir.imageUrl) {
        console.log(`Souvenir "${koName}" already has an imageUrl. Skipping.`);
        continue;
    }

    const generatedFilename = await generateImageForSouvenir(souvenir);
    if (generatedFilename) {
        generatedImageMap[koName] = generatedFilename;
    }
  }

  console.log('\n--- Image Generation Summary ---');
  for (const koName in generatedImageMap) {
      console.log(`"${koName}": ${generatedImageMap[koName]}`);
  }
  console.log('\nAll image generation attempts completed.');
}

main();
