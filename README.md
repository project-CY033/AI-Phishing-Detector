# AI-Phishing-Detector

<p align="center">
  <img src="https://github.com/user-attachments/assets/6e1147a8-75b2-4886-9ecf-e9a381357a10" alt="icon16">
</p>


- ### powerful AI for automated detection and blocking of malicious websites and emails. By integrating more sophisticated features and improving the AI model, the extension provides robust protection against phishing and malware threats. Always ensure that the extension complies with all relevant security and privacy standards.
 


---
---

```
AI-Phishing-Detector/
│
├── data/
│   ├── Phishing URLs.csv
│   └── Legitimate URLs.csv
├── training/
│   ├── train_phishing_model.ipynb
│   └── model/
│       ├── model.json
│       └── group1-shard1of1.bin
├── utils/
│   ├── ai_scanner.js
│   └── virus_total.js
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── options.html
├── options.js
├── styles.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── package.json
└── README.md
```

 

### **1. Training the AI Model**

The training process is similar to the previous section, but with enhancements:

1. **Dataset**: Use a comprehensive dataset that includes a wide range of phishing and legitimate URLs.
2. **Feature Extraction**: Implement more sophisticated feature extraction techniques, such as:
   - URL length
   - Presence of HTTPS
   - Number of dots
   - Presence of suspicious keywords
   - Domain age
3. **Model Architecture**: Use more complex models like LSTM or Transformer-based models for better accuracy.
4. **Training**: Train the model using TensorFlow or another machine learning framework.

### **2. Additional Features**

- **Real-time Alerts**: Notify users of detected threats in real-time.
- **Detailed Reports**: Provide users with detailed reports on blocked threats.
- **Customizable Settings**: Allow users to customize scanning sensitivity, automatic blocking, and reporting.
- **Blacklist/Whitelist**: Implement a blacklist/whitelist feature for users to manage exceptions.
- **Phishing Email Reporting**: Allow users to report phishing emails directly from the email client.

### **3. Deployment**

1. **Prepare Icons**: Ensure all necessary icon files are in the `icons/` directory.
2. **Update API Keys**: Replace `'YOUR_VIRUS_TOTAL_API_KEY'` with your actual VirusTotal API key.
3. **Train the Model**: Run the training script to train and save the phishing detection model.
4. **Load the Model**: In `utils/ai_scanner.js`, load the trained model using TensorFlow.js.
5. **Build the Extension**: Use a tool like Webpack to bundle the JavaScript files if necessary.
6. **Install the Extension**: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", and select the project directory.

### **4. Security and Privacy**

- **Data Handling**: Ensure that user data is handled securely and that privacy is maintained.
- **API Security**: Protect API keys by storing them securely and avoiding exposing them in client-side code.
- **Model Security**: Protect the AI model from tampering and ensure it is loaded securely.

 




---
---
---
---
# How to run
 

### **1. Prerequisites**

- **Node.js and npm**: Ensure you have Node.js and npm installed. You can download them from [here](https://nodejs.org/).
- **TensorFlow.js**: This is required for loading and using the AI model in the browser. Install it using npm:
  ```bash
  npm install @tensorflow/tfjs
  ```
- **VirusTotal API Key**: Sign up for a VirusTotal API key [here](https://www.virustotal.com/gui/join-us) if you haven't already.

### **2. Setting Up the Project**

1. **Create the Project Directory**:
   ```bash
   mkdir AI-Phishing-Detector
   cd AI-Phishing-Detector
   ```

2. **Initialize npm**:
   ```bash
   npm init -y
   ```

3. **Install Dependencies**:
   ```bash
   npm install @tensorflow/tfjs
   ```

4. **Create the File Structure**:
  files and directories as outlined in the project structure above.

### **3. Training the AI Model**

1. **Prepare the Dataset**:
   - Collect a dataset of phishing and legitimate URLs.
   - Save it as `phishing_dataset.csv` in the `data/` directory.

2. **Train the Model**:
   - Use the `train_phishing_model.ipynb` notebook to train your model.
   - Ensure you save the trained model in the `training/` directory as `phishing_model.h5` or convert it to TensorFlow.js format.

3. **Convert the Model to TensorFlow.js Format**:
   If your model is in Keras (`.h5`) format, convert it using the TensorFlow.js converter:
   ```bash
   npm install @tensorflow/tfjs @tensorflow/tfjs-converter
   npx tensorflowjs_converter --input_format=keras training/phishing_model.h5 training/model
   ```
   This will create a `model.json` file and binary weight files in the `training/model` directory.


 


### **3. Building the Extension**

1. **Ensure All Files Are Correctly Linked**:
   - Verify that all JavaScript files import dependencies correctly.
   - Ensure that the paths to the model and other resources are correct.

2. **Create a Production Build (Optional)**:
   If you’re using a bundler like Webpack, set it up to bundle your JavaScript files.

3. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" using the toggle in the top right corner.
   - Click on "Load unpacked" and select the `AI-Phishing-Detector` directory.

### **4. Testing the Extension**

1. **Test Website Blocking**:
   - Visit a known phishing website or use a test URL.
   - The extension should block the request and show a notification.

2. **Test Email Scanning**:
   - Open Gmail or another email client.
   - Open an email and ensure that the extension scans it for phishing attempts.

3. **Check Logs and Notifications**:
   - Monitor the console for any errors.
   - Ensure that notifications are appearing as expected.

### **5. Deployment**

1. **Prepare for Publishing**:
   - Update the `manifest.json` with the correct version number and description.
   - Add any necessary assets, such as icons.

2. **Package the Extension**:
   - Zip the contents of the `AI-Phishing-Detector` directory.

3. **Publish to the Chrome Web Store**:
   - Follow the [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program_policies/).
   - Upload the zip file and follow the prompts to publish.

### **6. Additional Considerations**

- **Performance**: Ensure that the AI model is optimized for performance in the browser.
- **Privacy**: Be transparent with users about the data the extension collects and how it is used.
- **Updates**: Plan for regular updates to the AI model and extension to address new threats.

### **7. Troubleshooting**

- **Model Loading Issues**: Ensure that the model files are correctly placed and that the paths in `ai_scanner.js` are accurate.
- **API Errors**: Verify that the VirusTotal API key is correct and that the API is functioning.
- **Permissions**: Make sure all necessary permissions are declared in `manifest.json`.

 




