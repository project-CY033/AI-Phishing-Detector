// background.js

import { checkURLWithVirusTotal } from './utils/virus_total.js';
import { aiScanURL } from './utils/ai_scanner.js';
import { scanEmail } from './utils/email_scanner.js';
import { aiScanURL, loadModel } from './utils/ai_scanner.js';

// Initialize AI model
let model;
(async () => {
  model = await loadModel();
})();

// Listen for web requests
chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = details.url;
    const isMalicious = await checkURL(url);
    if (isMalicious) {
      chrome.webRequest.onBeforeRequest.abort(details.requestId);
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Blocked Access',
        message: `The website ${url} has been blocked as it is suspected to be malicious.`
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Function to check URL using AI model and VirusTotal
async function checkURL(url) {
  // First, check against local AI model
  const isPhishing = await aiScanURL(url, model);
  if (isPhishing) {
    return true;
  }

  // Double-check with VirusTotal
  const vtResult = await checkURLWithVirusTotal(url);
  return vtResult.isMalicious;
}

// Function to load AI model
async function loadModel() {
  // Implement model loading logic here
  // For example:
  // const model = await tf.loadLayersModel('model.json');
  // return model;
  return null; // Placeholder
}

// Handle email scanning
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes('mail.google.com')) {
    chrome.tabs.sendMessage(details.tabId, { action: 'scanEmails' });
  }
}, { url: [{ urlContains: 'mail.google.com' }] });

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanEmails') {
    scanEmailsInPage(sender.tab.id);
  }
});

// Function to scan emails in the page
async function scanEmailsInPage(tabId) {
  const emails = await getEmailsFromPage(tabId);
  emails.forEach(email => {
    const scanResult = scanEmail(email);
    if (scanResult.isPhishing) {
      chrome.tabs.sendMessage(tabId, { action: 'markEmailAsPhishing', email: email });
    }
  });
}

async function getEmailsFromPage(tabId) {
  // Implement logic to retrieve emails from the page
  return []; // Placeholder
}
