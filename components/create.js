let recorder;
let videoStream;
let timerInterval;

const video = document.getElementById('video');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const uploadBtn = document.getElementById('upload');
const preview = document.getElementById('preview');
const timer = document.getElementById('timer');

function iniciarTemporizador() {
  let segundos = 0;
  timerInterval = setInterval(() => {
    segundos++;
    const minutos = Math.floor(segundos / 60);
    const hrs = Math.floor(minutos / 60);
    const display = `${hrs.toString().padStart(2, '0')}:${(minutos % 60).toString().padStart(2, '0')}:${(segundos % 60).toString().padStart(2, '0')}`;
    timer.textContent = display;
  }, 1000);
}

function detenerTemporizador() {
  clearInterval(timerInterval);
  timer.textContent = "00:00:00";
}

startBtn.addEventListener('click', async () => {
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;

    recorder = RecordRTC(videoStream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
    });

    recorder.startRecording();
    iniciarTemporizador();

    startBtn.disabled = true;
    stopBtn.disabled = false;
    uploadBtn.disabled = true;
  } catch (err) {
    console.error('No se pudo acceder a la cámara:', err);
  }
});

stopBtn.addEventListener('click', async () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  uploadBtn.disabled = false;

  await recorder.stopRecording();
  video.srcObject.getTracks().forEach(track => track.stop());

  detenerTemporizador();

  const gifBlob = recorder.getBlob();
  const gifURL = URL.createObjectURL(gifBlob);

  const gif = document.createElement('img');
  gif.src = gifURL;
  gif.setAttribute("alt", "Vista previa del GIF");

  preview.innerHTML = '';
  preview.appendChild(gif);

  // Guardamos el blob para subir más adelante
  uploadBtn.dataset.blob = gifBlob;
});

uploadBtn.addEventListener('click', () => {
  const gifBlob = recorder.getBlob();
  const form = new FormData();
  form.append('file', gifBlob, 'mi_guifo.gif');
  form.append('api_key', '1CXx6tt3QiStS0e4wUrgoiW9T21zhMep');

  fetch('https://upload.giphy.com/v1/gifs', {
    method: 'POST',
    body: form,
  })
    .then(response => response.json())
    .then(data => {
      console.log('GIF subido a Giphy:', data);
      alert('¡Tu guifo fue subido a Giphy con éxito!');
    })
    .catch(error => {
      console.error('Error al subir el GIF:', error);
      alert('Hubo un error al subir el guifo.');
    });
});
