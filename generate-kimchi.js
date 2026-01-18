
const fs = require('fs');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');

// --- CONFIGURATION ---
const PROJECT_ID = 'jocoding-week1-04038098-1c9c8';
const LOCATION = 'us-central1';
const MODEL_ID = 'imagegeneration@006'; // Using a stable version of Imagen
const OUTPUT_FILE = './public/images/doenjang.jpg';

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function generateImage() {
  console.log('--- Starting Image Generation for Doenjang ---');

  const endpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}`;

  const prompt = {
    prompt: 'a bowl of Doenjang (Korean soybean paste), high resolution, 400x400, studio quality, food photography',
  };
  const instanceValue = helpers.toValue(prompt);
  const instances = [instanceValue];

  const parameter = {
    sampleCount: 1,
    // You can add other parameters here, like aspectRatio, seed, etc.
  };
  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    instances,
    parameters,
  };

  try {
    console.log('Sending request to Vertex AI...');
    const [response] = await predictionServiceClient.predict(request);
    console.log('Received response.');

    const predictions = response.predictions;
    if (!predictions || predictions.length === 0) {
      console.error('No predictions returned from the API.');
      return;
    }

    const imageBase64 = predictions[0].structValue.fields.bytesBase64Encoded.stringValue;

    if (!imageBase64) {
      console.error('Could not find image data in the API response.');
      return;
    }
    
    console.log(`Decoding base64 image and saving to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(imageBase64, 'base64'));
    console.log(`✅ Successfully saved image to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('--- ERROR DURING IMAGE GENERATION ---');
    console.error(error.message || error);
    if (error.details) {
        console.error('Error Details:', error.details);
    }
  }
}

generateImage();
