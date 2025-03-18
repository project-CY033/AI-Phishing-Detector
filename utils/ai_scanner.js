// utils/ai_scanner.js

import * as tf from '@tensorflow/tfjs';

let model;

export async function loadModel() {
  model = await tf.loadLayersModel('training/model/model.json');
  return model;
}

export async function aiScanURL(url, model) {
  const features = extractFeatures(url);
  const tensor = tf.tensor2d([features], [1, features.length]);
  const prediction = await model.predict(tensor).data();
  return prediction[0] > 0.5;
}

function extractFeatures(url) {
  const length = url.length;
  const hasHttps = url.includes('https') ? 1 : 0;
  // Add more features as needed
  return [length, hasHttps];
}
