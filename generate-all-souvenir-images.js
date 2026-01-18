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
  const startMarker = 'const initialSouvenirs = [';
  const endMarker = '];';

  const startIndex = mainJsContent.indexOf(startMarker);
  if (startIndex === -1) {
    console.error('Could not find start marker for initialSouvenirs array in main.js.');
    return [];
  }

  // Find the matching closing bracket ']' after the start marker
  // We need to account for nested brackets, but for a simple array of objects,
  // finding the next '];' should be sufficient if there are no nested array definitions at the top level
  let bracketCount = 0;
  let endIndex = -1;
  // Start from just before the first '[' to correctly count
  for (let i = startIndex + 'const initialSouvenirs = '.length -1; i < mainJsContent.length; i++) {
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
    console.error('Could not find end marker for initialSouvenirs array in main.js.');
    return [];
  }

  const jsonLikeString = mainJsContent.substring(
    startIndex + 'const initialSouvenirs = '.length -1, // Include the opening '['
    endIndex + 1 // Include the closing ']'
  );

  try {
    // Use eval carefully, assuming main.js is trusted.
    // A more robust solution for production would involve parsing the JS AST.
    const souvenirs = eval(jsonLikeString);
    return souvenirs;
  } catch (e) {
    console.error('Error parsing initialSouvenirs array from main.js:', e);
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
  const outputFile = path.join(OUTPUT_DIR, slugName + '.jpg');

  // Skip if image already exists
  if (fs.existsSync(outputFile)) {
    console.log('Image for "' + koName + '" already exists at ' + outputFile + '. Skipping.');
    return;
  }

  console.log('--- Starting Image Generation for "' + koName + '" ---');

  const endpoint = 'projects/' + PROJECT_ID + '/locations/' + LOCATION + '/publishers/google/models/' + MODEL_ID;

    const promptModifiers = {

      "식품": "on a wooden table, with natural lighting, focus on deliciousness, appetizing",

      "화장품": "elegant packaging, on a vanity, luxurious, smooth texture",

      "의류": "worn by a model, fashion photography, well-styled, on a mannequin",

      "전통 상품": "in a traditional Korean setting, handcrafted, intricate details, cultural significance",

      "K-POP 굿즈": "fan merchandise, vibrant colors, pop culture aesthetic, idol related"

    };

  

    const skipList = ["김치", "고추장", "된장", "쌈장"]; 

  

      const customPrompts = {

  

        "바나나맛 우유": "high resolution photo of a 200ml sterile milk carton with a pastel yellow design, the container is cylindrical, thicker in the middle than top and bottom (looks hexagonal from the side), studio quality, 400x400, clear background, product photography",

  

        "수정과": "high resolution photo of red sujeonggwa traditional Korean cinnamon punch in a clear glass, studio quality, 400x400, clear background, product photography",

  

        "마스크팩": "high resolution photo of a face-shaped sheet mask with cutouts for eyes, nose, and mouth, elegant packaging, on a vanity, luxurious, smooth texture, studio quality, 400x400, clear background, product photography",

  

        "풋 마스크": "high resolution photo of foot mask packaging with a picture of feet on it, elegant packaging, on a vanity, luxurious, smooth texture, studio quality, 400x400, clear background, product photography",

  

        "노리개": "high resolution photo of a traditional Korean norigae tassel hanging on the right chest of a hanbok-wearing model, with outer clothing layered over it, fashion photography, well-styled, studio quality, 400x400, clear background",

  

        "볼캡": "high resolution photo of a model wearing a ball cap, with head slightly bowed to reduce face exposure and emphasize the cap, fashion photography, well-styled, on a mannequin, studio quality, 400x400, clear background",

  

        "응원봉": "high resolution photo of a stick-shaped K-POP light stick, fan merchandise, vibrant colors, pop culture aesthetic, idol related, studio quality, 400x400, clear background, product photography",

  

        "스티커": "high resolution photo of cute Joseon Palace Guard character stickers, fan merchandise, vibrant colors, pop culture aesthetic, idol related, studio quality, 400x400, clear background, product photography",

  

        "도장": "high resolution photo of a cylindrical black traditional Korean stamp with mother-of-pearl design on its curved surface, Korean characters '[제시카인]' (Jessica In) engraved on the bottom surface, in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",

  

        "민화 그림": "high resolution photo of a Korean folk painting (minhwa) on hanji paper, depicting daily life of Joseon commoners with black ink, traditional Korean oriental painting style, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",

  

        "제기": "high resolution photo of a Korean jegi shuttlecock toy used in the traditional Korean game of Jegichagi, with a coin-sized weight (flat cylindrical shape) at the bottom and narrow, dense shimmering plastic streamers, studio quality, 400x400, clear background, product photography",

  

        "윷놀이 세트": "high resolution photo of a Yut Nori game set, including four thin, long wooden yut sticks with black 'X' markings and a yut board with a 6x6 grid of dots, diagonal lines connecting corners, and 2 dots on diagonals leading to a central dot, all made of wood, traditional Korean board game, in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",

  

        "공기놀이": "high resolution photo of five fingernail-sized, colorful, cylindrical gonggi stones used in the traditional Korean game of Gonggi Nori, studio quality, 400x400, clear background, product photography",

  

        "한글 디자인 상품": "high resolution photo of a traditional Korean square lantern with subtle Hangeul script design, the Hangeul text is tone-on-tone with the background color, in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",

  

        "훈민정음 손수건": "high resolution photo of a handkerchief with the Hunminjeongeum preface text by King Sejong, written in the original historical orthography (e.g., '나랏말싸미...'), in a traditional Korean setting, handcrafted, intricate details, cultural significance, studio quality, 400x400, clear background",

  

        "비녀": "high resolution photo of the back of a model's head wearing a traditional Korean binyeo hairpin, with intricate details, studio quality, 400x400, clear background, fashion photography",

  

        "아이돌 앨범": "high resolution photo of a fictional K-POP boy group's third album CD case with a cosmic space illustration, album cover art, fan merchandise, vibrant colors, pop culture aesthetic, studio quality, 400x400, clear background, product photography",

  

        "포토카드": "high resolution photo of a credit card-sized photo card featuring a fictional K-POP boy group member resembling BTS, fan merchandise, vibrant colors, pop culture aesthetic, studio quality, 400x400, clear background, product photography",

  

        "연예인 화보집": "high resolution photo of a lovely brochure-style photobook of a fictional lead Korean actress resembling Miss A Suzy and Han Hyo-joo, studio quality, 400x400, clear background, product photography",

  

        "인형": "high resolution photo of a fictional Jindo dog character doll, cute, studio quality, 400x400, clear background, product photography",

  

        "공식 굿즈": "high resolution photo of a chibi SD size character doll (fist-sized) of a fictional K-POP boy group member, fan merchandise, vibrant colors, pop culture aesthetic, studio quality, 400x400, clear background, product photography"

  

      };

  

    let finalPromptText = '';

    if (skipList.includes(koName)) {

        console.log('--- Skipping image generation for "' + koName + '" as it\'s in the skip list within generateImageForSouvenir ---');

        return null; // Return null if skipped

    } else if (customPrompts[koName]) { // Check for custom prompt first

        finalPromptText = customPrompts[koName];

    } else {

        const descriptionEn = souvenir.description.en; 

        let specificModifier = promptModifiers[souvenir.category] || "";

        if (specificModifier) {

            specificModifier = ", " + specificModifier;

        }

        finalPromptText = 'high resolution photo of ' + koName + ', ' + descriptionEn + specificModifier + ', studio quality, 400x400, clear background, product photography';

    }  const prompt = {
    prompt: finalPromptText,
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
    console.log('Sending request to Vertex AI for "' + koName + '"...');
    const [response] = await predictionServiceClient.predict(request);
    console.log('Received response for "' + koName + '".');

    const predictions = response.predictions;
    if (!predictions || predictions.length === 0) {
      console.error('No predictions returned from the API for "' + koName + '".');
      return null;
    }

    const imageBase64 = predictions[0].structValue.fields.bytesBase64Encoded.stringValue;

    if (!imageBase64) {
      console.error('Could not find image data in the API response for "' + koName + '".');
      return null;
    }
    
    console.log('Decoding base64 image and saving to ' + outputFile + '...');
    fs.writeFileSync(outputFile, Buffer.from(imageBase64, 'base64'));
    console.log('✅ Successfully saved image for "' + koName + '" to ' + outputFile);
    return slugName + '.jpg'; // Return the filename
  } catch (error) {
    console.error('--- ERROR DURING IMAGE GENERATION for "' + koName + '" ---');
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
    const generatedFilename = await generateImageForSouvenir(souvenir);
    if (generatedFilename) {
        generatedImageMap[souvenir.name.ko] = generatedFilename;
    }
  }

  console.log('\n--- Image Generation Summary ---');
  for (const koName in generatedImageMap) {
      console.log(`"${koName}": ${generatedImageMap[koName]}`);
  }
  console.log('\nAll image generation attempts completed.');
}

main();
