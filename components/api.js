let startPag = 0;
let liminPag = 35;

const API_KEY = "1CXx6tt3QiStS0e4wUrgoiW9T21zhMep";

// Obtener detalles de un gif individual
const getGifDetails = async (gifId) => {
  const detailsUrl = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`;
  const response = await fetch(detailsUrl);
  const data = await response.json();
  return data.data;
};

async function getApi(startPag) {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${liminPag}&offset=${startPag}&rating=g`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);

    if (data && data.data && data.data.length > 0) {
      const giftContainer = document.getElementById("gif-container");
      giftContainer.innerHTML = '';

      for (const gif of data.data) {
        let gifImg = gif.images.fixed_height.url;
        gifImg = encodeURI(gifImg);

        const imgElement = document.createElement("img");
        imgElement.src = gifImg;
        imgElement.alt = gif.title || 'GIF';

        const tagOverlay = document.createElement("div");
        tagOverlay.classList.add("gif-tags");

        try {
          const gifDetails = await getGifDetails(gif.id);

          // Si existieran tags (no siempre disponibles)
          if (gifDetails && gifDetails.title) {
            const words = gifDetails.title.split(" ");
            const hashtags = words.map(word => `#${word.toLowerCase()}`).join(" ");
            tagOverlay.textContent = hashtags;
          } else {
            tagOverlay.textContent = "#gif";
          }
        } catch (err) {
          console.error("Error obteniendo detalles del gif:", err);
          tagOverlay.textContent = "#gif";
        }

        imgElement.addEventListener("load", () => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('gif-wrapper');
      
          if (imgElement.naturalWidth > 298) {
            wrapper.classList.add('wide');
          }
      
          wrapper.appendChild(imgElement);
          wrapper.appendChild(tagOverlay);
          giftContainer.appendChild(wrapper);
        });
      }
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
  document.getElementById('back').addEventListener('click', anteriorPag);
  document.getElementById('next').addEventListener('click', siguientePag);
};
