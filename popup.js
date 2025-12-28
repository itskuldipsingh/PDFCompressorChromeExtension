pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('lib/pdf.worker.min.js');

let currentPDF = null;
let fileName = "file";

const qSlider = document.getElementById('quality');
const sSlider = document.getElementById('scale');

// 1. Handle File Upload
document.getElementById('fileInput').onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  fileName = file.name.replace(".pdf", "");
  document.getElementById('origSize').innerText = (file.size / (1024 * 1024)).toFixed(2) + " MB";
  
  const arrayBuffer = await file.arrayBuffer();
  currentPDF = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
  updateEstimate();
};

// 2. Live Estimation
async function updateEstimate() {
  if (!currentPDF) return;
  document.getElementById('qVal').innerText = qSlider.value;
  document.getElementById('sVal').innerText = sSlider.value;

  const page = await currentPDF.getPage(1);
  const viewport = page.getViewport({scale: parseFloat(sSlider.value)});
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  await page.render({canvasContext: canvas.getContext('2d'), viewport}).promise;
  const dataUrl = canvas.toDataURL('image/jpeg', qSlider.value / 100);
  
  // Base64 to Byte calculation
  const bytes = (dataUrl.length - 23) * 0.75; 
  const totalMB = (bytes * currentPDF.numPages / (1024 * 1024)).toFixed(2);
  document.getElementById('estSize').innerText = `~${totalMB} MB`;
}

[qSlider, sSlider].forEach(el => el.oninput = updateEstimate);

// 3. Compression Execution
document.getElementById('compressBtn').onclick = async () => {
  if (!currentPDF) return alert("Select a PDF");
  const btn = document.getElementById('compressBtn');
  const prog = document.getElementById('progressBar');
  
  btn.disabled = true;
  prog.style.display = "block";
  
  const { jsPDF } = window.jspdf;
  let newPdf = null;

  for (let i = 1; i <= currentPDF.numPages; i++) {
    document.getElementById('status').innerText = `Processing ${i}/${currentPDF.numPages}`;
    const page = await currentPDF.getPage(i);
    const viewport = page.getViewport({scale: parseFloat(sSlider.value)});
    
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({canvasContext: canvas.getContext('2d'), viewport}).promise;

    const imgData = canvas.toDataURL('image/jpeg', qSlider.value / 100);
    
    if (i === 1) {
      newPdf = new jsPDF(viewport.width > viewport.height ? 'l' : 'p', 'px', [viewport.width, viewport.height]);
    } else {
      newPdf.addPage([viewport.width, viewport.height], viewport.width > viewport.height ? 'l' : 'p');
    }
    
    newPdf.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);
    prog.value = (i / currentPDF.numPages) * 100;
  }

  newPdf.save(`${fileName}_compressed.pdf`);
  btn.disabled = false;
  document.getElementById('status').innerText = "Done!";
};