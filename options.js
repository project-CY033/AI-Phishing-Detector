// options.js

// Load settings
chrome.storage.sync.get(['enableAI', 'enableVT', 'enableNotifications'], (data) => {
  document.getElementById('enableAI').checked = data.enableAI;
  document.getElementById('enableVT').checked = data.enableVT;
  document.getElementById('enableNotifications').checked = data.enableNotifications;
});

// Save settings
document.getElementById('enableAI').addEventListener('change', (e) => {
  chrome.storage.sync.set({ enableAI: e.target.checked });
});
document.getElementById('enableVT').addEventListener('change', (e) => {
  chrome.storage.sync.set({ enableVT: e.target.checked });
});
document.getElementById('enableNotifications').addEventListener('change', (e) => {
  chrome.storage.sync.set({ enableNotifications: e.target.checked });
});
