// ai_scanner.js

// Load AI Model
let aiModel;

// Load the trained AI model for phishing detection
async function loadModel() {
    const modelURL = chrome.runtime.getURL('training/model/model.json');
    const weightsURL = chrome.runtime.getURL('training/model/group1-shard1of1.bin');

    aiModel = await tf.loadLayersModel(modelURL);
    console.log('AI Model loaded successfully.');
}

// AI-based URL phishing detection
async function checkPhishing(url) {
    if (!aiModel) await loadModel();

    const urlFeatures = extractURLFeatures(url);
    const prediction = aiModel.predict(tf.tensor2d([urlFeatures]));

    const isPhishing = prediction.dataSync()[0] > 0.5; // Threshold
    return isPhishing;
}

// Extract key URL features for AI model analysis
function extractURLFeatures(url) {
    const features = [
        url.length,
        (url.match(/\d/g) || []).length, // Number of digits
        (url.match(/-/g) || []).length,  // Number of dashes
        (url.match(/_/g) || []).length,  // Number of underscores
        (url.match(/\//g) || []).length, // Number of slashes
        (url.match(/\?/g) || []).length, // Number of question marks
        (url.match(/=/g) || []).length,  // Number of equal signs
        (url.match(/%/g) || []).length,  // Number of percentage symbols
        url.includes("https") ? 1 : 0,   // Secure connection check
        url.includes("@") ? 1 : 0,       // Presence of '@' (suspicious)
    ];

    return features;
}

// AI-based email phishing detection
function checkEmail(emailContent) {
    const phishingKeywords = [
        "urgent", "verify", "password", "bank", "login", "security", "account",
        "update", "alert", "suspicious", "verify now", "click here", "free gift"
    ];

    const contentLower = emailContent.toLowerCase();
    return phishingKeywords.some(keyword => contentLower.includes(keyword));
}

// Expose functions for other scripts
const aiScanner = {
    checkPhishing,
    checkEmail
};



// 


async function analyzeURL(url) {
    const suspiciousPatterns = [
        /login\./i,
        /secure\./i,
        /account-verification/i,
        /update-info/i
    ];

    const isSuspicious = suspiciousPatterns.some((pattern) => pattern.test(url));

    return isSuspicious;
}

async function checkURLWithAI(url) {
    const modelURL = chrome.runtime.getURL('training/model/model.json');

    const model = await tf.loadLayersModel(modelURL);
    const input = tf.tensor([[url.length, url.includes("https") ? 1 : 0]]);

    const prediction = model.predict(input).dataSync()[0];
    return prediction > 0.5;
}
