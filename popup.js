// popup.js

document.getElementById('scan-now').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { action: 'scanPage' }, (response) => {
      document.getElementById('status').innerText = `Status: ${response.status}`;
    });
  });
});

// Load settings
chrome.storage.sync.get(['autoBlock', 'autoReport'], (data) => {
  document.getElementById('autoBlock').checked = data.autoBlock;
  document.getElementById('autoReport').checked = data.autoReport;
});

// Save settings
document.getElementById('autoBlock').addEventListener('change', (e) => {
  chrome.storage.sync.set({ autoBlock: e.target.checked });
});
document.getElementById('autoReport').addEventListener('change', (e) => {
  chrome.storage.sync.set({ autoReport: e.target.checked });
});
