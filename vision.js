

'use strict';
async function detectSafeSearch(fileName) {
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
const projectId = "childproof-301905";
const keyFilename = "APIKey.json";


const imgName = 'test3.jpg';

// Performs safe search property detection on the remote file
const [result] = await client.safeSearchDetection(imgName);
const detections = result.safeSearchAnnotation;
console.log('Safe search:');
console.log(`Adult: ${detections.adult}`);
console.log(`Medical: ${detections.medical}`);
console.log(`Spoof: ${detections.spoof}`);
console.log(`Violence: ${detections.violence}`);
console.log(`Racy: ${detections.racy}`);
}

detectSafeSearch();
