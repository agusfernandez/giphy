let recorder;
let videoStream;

const video = document.getElementById('video');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const preview = document.getElementById('preview');

startBtn.addEventListener('click', async () => {
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
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', async () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;

  await recorder.stopRecording();

  // Detener la cámara
  video.srcObject.getTracks().forEach(track => track.stop());

  const gifBlob = recorder.getBlob();
  const gifURL = URL.createObjectURL(gifBlob);

  // Mostrar el gif generado
  const gif = document.createElement('img');
  gif.src = gifURL;
  preview.innerHTML = '';
  preview.appendChild(gif);

  // Subir a Giphy
  const form = new FormData();
  form.append('file', gifBlob, 'mi_gif.gif');
  form.append('api_key', '1CXx6tt3QiStS0e4wUrgoiW9T21zhMep');

  fetch('https://upload.giphy.com/v1/gifs', {
    method: 'POST',
    body: form,
  })
    .then(response => response.json())
    .then(data => {
      console.log('GIF subido a Giphy:', data);
    })
    .catch(err => console.error('Error al subir GIF:', err));
});
