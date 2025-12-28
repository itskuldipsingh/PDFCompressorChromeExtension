# 🗜️ Local PDF Compressor

A privacy-focused Chrome Extension that compresses PDF files **100% locally** in your browser. No files are ever uploaded to a server, ensuring your data stays secure.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2-green.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20Local-orange.svg)

## 🚀 Features

* **100% Privacy:** All processing happens in your browser's memory using JavaScript.
* **Live Estimation:** See the estimated output size in real-time as you adjust settings.
* **Resolution Scaling:** Adjust the DPI/Scale of the PDF to drastically reduce file size.
* **Quality Control:** Fine-tune JPEG compression levels.
* **Tab-Based UI:** Opens in a full browser tab for a stable and comfortable workspace.

## 🛠️ Installation (Developer Mode)

Since this is a custom extension, you must load it manually into Chrome:

1.  **Download/Clone** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Turn on **"Developer mode"** (toggle in the top-right corner).
4.  Click the **"Load unpacked"** button.
5.  Select the folder containing this project's files.
6.  The **Local PDF Compressor** icon will now appear in your extension list!

## 📂 Project Structure

```text
.
├── manifest.json       # Extension configuration
├── background.js       # Logic to launch the extension in a new tab
├── popup.html          # Main user interface
├── popup.js            # Core compression & estimation logic
├── popup.css           # Styling for the application
└── lib/                # Local libraries (REQUIRED)
    ├── pdf.min.js
    ├── pdf.worker.min.js
    └── jspdf.umd.min.js
```

## 💎 Credits & Resources

This extension is made possible by the following incredible open-source libraries:

* **[PDF.js](https://mozilla.github.io/pdf.js/)** by Mozilla – Used for parsing and rendering PDF documents in the browser. (Licensed under Apache 2.0)
* **[jsPDF](https://github.com/parallax/jsPDF)** by Parallax – Used for generating the new compressed PDF files. (Licensed under MIT)
* **[Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)** – Documentation and APIs provided by Google.

### Why these libraries?
By combining **PDF.js** (to read) and **jsPDF** (to write), we can process files entirely within the browser's memory. This "Reader-to-Canvas-to-Writer" pipeline is what allows for 100% local compression without a backend server.
