# AI Phishing Detector Pro

## 🚀 Overview
AI Phishing Detector Pro is a powerful Chrome extension that protects users from phishing attacks using advanced AI models and VirusTotal integration.

---

## 🔧 Features
✅ Real-time scanning of websites  
✅ Manual scan option for custom URLs  
✅ AI-powered phishing detection  
✅ VirusTotal integration for enhanced threat detection  
✅ Detailed analysis and reports on detected threats  
✅ Customizable scanning sensitivity  
✅ Blacklist and Whitelist management  
✅ Email phishing detection and spam filtering  
✅ Auto-report phishing emails to authorities  
✅ Privacy protection with end-to-end encryption  
✅ Optimized for minimal browser performance impact  

---

## 📋 Installation
1. Download or clone this repository.
2. Open **chrome://extensions/** in your browser.
3. Enable **Developer mode** (toggle at the top-right corner).
4. Click on **Load unpacked** and select the `AI-Phishing-Detector` folder.
5. The extension will now appear in your browser’s toolbar.

---
---
# For modal traning
- ## switch directory
```
cd AI-Phishing-Detector/training
```

## ⚠️start tarning but it take time and more resources like RAM , CPU etc
- ## IF your Device have low configuration then you can you pretrain model this preterain model tran on large data set approximate ~ 876840 
- ## check beform  start traning , check  your device health

## start training model
- ### switch dir
```
cd AI-Phishing-Detector/training
```
- ### install package
```
pip install pandas numpy scikit-learn tensorflow tensorflowjs keras-tuner joblib

```

- ### run
```
python train.py
```

---

## 📖 Usage
1. Click the **extension icon** to open the popup.
2. Use the **Scan Current Website** button to analyze the active tab.
3. For VirusTotal scanning, enter a URL and click **VirusTotal Scan**.
4. Customize settings like sensitivity, notifications, and trusted sites via the **Options** page.

---

## 🔐 Privacy
This extension encrypts data for secure communication. No user data is stored or shared without consent.

---

## ⚠️ Disclaimer
While AI Phishing Detector Pro enhances browsing safety, always practice safe internet habits.

---

## 📬 Support
For questions or issues, please contact: **[Musraf khan](https://22cy033.netlify.app/)**




```
Directory structure:
└── project-cy033-ai-phishing-detector/
    ├── README.md
    ├── background.js
    ├── content.js
    ├── manifest.json
    ├── options.html
    ├── options.js
    ├── package.json
    ├── popup.html
    ├── popup.js
    ├── styles.css
    ├── tt.md
    ├── data/
    │   ├── Legitimate URLs.csv
    │   ├── Phishing URLs.csv
    │   ├── phishing_dataset.csv
    │   └── r
    ├── Doc/
    │   └── README.md
    ├── Hacathon-data/
    │   └── README.md
    ├── icons/
    │   └── r
    ├── training/
    │   ├── train.py
    │   ├── train_phishing_model.ipynb
    │   ├── model/
    │   │   ├── group1-shard1of1.bin
    │   │   └── model.json
    │   └── tuner_results/
    │       └── phishing_detector_tuning/
    │           ├── oracle.json
    │           ├── tuner0.json
    │           ├── trial_00/
    │           │   ├── build_config.json
    │           │   ├── checkpoint.weights.h5
    │           │   └── trial.json
    │           ├── trial_01/
    │           │   ├── build_config.json
    │           │   ├── checkpoint.weights.h5
    │           │   └── trial.json
    │           ├── trial_02/
    │           │   ├── build_config.json
    │           │   ├── checkpoint.weights.h5
    │           │   └── trial.json
    │           └── trial_03/
    │               └── trial.json
    └── utils/
        ├── ai_scanner.js
        ├── email_scanner.js
        └── virus_total.js


```
