// src/App.js

import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import Options from './components/Options';
import { chrome } from 'chrome-api';

const App = () => {
  const [view, setView] = useState('popup');
  const [scanStatus, setScanStatus] = useState('Idle');

  useEffect(() => {
    // Handle messages from background scripts
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'updateStatus') {
        setScanStatus(message.status);
      }
    });
  }, []);

  const handleScan = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scanPage' });
    });
  };

  return (
    <div>
      {view === 'popup' && <Popup scanStatus={scanStatus} handleScan={handleScan} />}
      {view === 'options' && <Options />}
    </div>
  );
};

export default App;
