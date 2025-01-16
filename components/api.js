let startPag = 0;
let liminPag = 30;

const API_KEY = "1CXx6tt3QiStS0e4wUrgoiW9T21zhMep";

async function getApi(startPag) {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${liminPag}&offset=${startPag}&rating=g`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Mostrar Gifs
    if (data && data.data && data.data.length > 0) {
      const giftContainer = document.getElementById("gif-container");
      giftContainer.innerHTML = ''; 

      data.data.forEach(gif => {
        let gifImg = gif.images.fixed_height.url;
        console.log('GIF URL:', gifImg); // Verifica la URL en la consola
        gifImg = encodeURI(gifImg); // Asegúrate de codificar correctamente la URL

        // Crear elemento <img> para mostrar el GIF
        const imgElement = document.createElement("img");
        imgElement.src = gifImg; // Asignar URL del GIF
        imgElement.alt = gif.title || 'GIF'; // Asignar un texto alternativo
        giftContainer.appendChild(imgElement);
      });
    } else {
      console.log('No se encontraron GIFs.');
    }
  } catch (error) {
    console.error('Se generó un error:', error);
  }
}

// Manejo de Paginación
const siguientePag = () => {
  startPag += liminPag;
  getApi(startPag);
};

const anteriorPag = () => {
  if (startPag > 0) {
    startPag -= liminPag;
    getApi(startPag);
  }
};

window.onload = () => {
  getApi(startPag);

  // Botones para la paginación
  document.getElementById('back').addEventListener('click', anteriorPag);
  document.getElementById('next').addEventListener('click', siguientePag);
};
