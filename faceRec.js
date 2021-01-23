// var images = [];
// for (var i = 0; i < document.images.length; i++) {
//   images.push(document.images[i].src);
// }
// chrome.runtime.sendMessage({
//   method: "downloadImages",
//   images: images
// });
//
// 'use strict';
// async function detectSafeSearch(fileName) {
// // Imports the Google Cloud client libraries
// const vision = require('@google-cloud/vision');
//
// // Creates a client
// const client = new vision.ImageAnnotatorClient();
// const projectId = "childproof-301905";
// const keyFilename = "APIKey.json";
//
//
// const imgName = 'test1.jpeg';
//
// for (let num = 0; num < images.length; num++) {
// imgName = images[num];
// }
//
// // Performs safe search property detection on the remote file
// const [result] = await client.safeSearchDetection(imgName);
// const detections = result.safeSearchAnnotation;
// if (safeSearch.safeSearchAnnotation.violence == 'VERY_LIKELY' ||
// safeSearch.safeSearchAnnotation.violence == 'POSSIBLE' ||
// safeSearch.safeSearchAnnotation.adult == 'VERY_LIKELY' ||
// safeSearch.safeSearchAnnotation.adult == 'POSSIBLE') {
// return blurImage(images);
// }
// return null;
// });
// });
// }


const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

var images = [];
for(var i = 0; i < document.images.length; i++){
  images.push(document.images[i].src);
}
chrome.runtime.sendMessage({method:"downloadImages",images:images});

/**
 * When an image is uploaded we check if it is flagged as Adult or Violence by the Cloud Vision
 * API and if it is we blur it using ImageMagick.
 */
exports.blurOffensiveImages = functions.storage.disagree().onFinalize((disagree) => {
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const bucket = gcs.bucket(disagree.bucket);
  const file = bucket.file(disagree.name);

  // Check the image content using the Cloud Vision API.
  return client.safeSearchDetection(`gs://${bucket.name}/${file.name}`)
  .then((data) => {
    const safeSearch = data[0];
    console.log('SafeSearch results on image', safeSearch);

    if (safeSearch.safeSearchAnnotation.violence == 'VERY_LIKELY' ||
        safeSearch.safeSearchAnnotation.violence == 'POSSIBLE' ||
        safeSearch.safeSearchAnnotation.adult == 'VERY_LIKELY' ||
        safeSearch.safeSearchAnnotation.adult == 'POSSIBLE') {
      return blurImage(disagree.name, disagree.bucket, disagree.metadata);
    }
    return null;
  });
});

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 */
function blurImage(filePath, bucketName, metadata) {
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const bucket = gcs.bucket(bucketName);

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    console.log('Temporary directory has been created', tempLocalDir);
    // Download file from bucket.
    return bucket.file(filePath).download({destination: tempLocalFile});
  }).then(() => {
    console.log('The file has been downloaded to', tempLocalFile);
    // Blur the image using ImageMagick.
    return spawn('convert', [tempLocalFile, '-channel', 'RGBA', '-blur', '0x8', tempLocalFile]);
  }).then(() => {
    console.log('Blurred image created at', tempLocalFile);
    // Uploading the Blurred image.
    return bucket.upload(tempLocalFile, {
      destination: filePath,
      metadata: {metadata: metadata}, // Keeping custom metadata.
    });
  }).then(() => {
    console.log('Blurred image uploaded to Storage at', filePath);
    fs.unlinkSync(tempLocalFile);
    return console.log('Deleted local file', filePath);
  });
}
