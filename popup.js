// popup.js

document.getElementById('scan-now').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { action: 'scanPage' }, (response) => {
      document.getElementById('status').innerText = `Status: ${response.status}`;
    });
  });
});
