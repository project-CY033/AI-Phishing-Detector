// utils/ai_scanner.js

import * as tf from '@tensorflow/tfjs';
import * as scaler from '../training/scaler.save';

let model;
let scalerModel;

export async function loadModel() {
  model = await tf.loadLayersModel('training/model/model.json');
  scalerModel = scaler;
  return model;
}

export async function aiScanURL(url, model) {
  const features = extractFeatures(url);
  const scaledFeatures = scalerModel.transform([features]);
  const tensor = tf.tensor2d(scaledFeatures, [1, scaledFeatures.length]);
  const prediction = await model.predict(tensor).data();
  return prediction[0] > 0.5;
}

function extractFeatures(url) {
  const length = url.length;
  const num_dots = url.split('.').length - 1;
  const has_https = url.includes('https') ? 1 : 0;
  const has_double_slash = url.includes('//') ? 1 : 0;
  const domain = url.split('//')[-1].split('/')[0];
  const domain_length = domain.length;
  const is_ip = isIP(domain) ? 1 : 0;
  const num_subdomains = domain.split('.').length - 1;
  const has_sensitive_keywords = hasSensitiveKeywords(url) ? 1 : 0;
  
  return [length, num_dots, has_https, has_double_slash, domain_length, is_ip, num_subdomains, has_sensitive_keywords];
}

function isIP(domain) {
  const regex = /^\d+\.\d+\.\d+\.\d+$/;
  return regex.test(domain);
}

function hasSensitiveKeywords(url) {
  const keywords = ['login', 'admin', 'account', 'update', 'service', 'payment', 'secure'];
  return keywords.some(keyword => url.toLowerCase().includes(keyword));
}
