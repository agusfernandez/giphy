const giftContainer = document.getElementById("suggestions-container");

const createGifCard = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
    const data = await response.json();
    const gif = data.data;

   

    const gifCard = document.createElement('div');
    gifCard.classList.add('gif-card');

    const header = document.createElement('div');
    header.classList.add('gif-header');
    header.innerHTML = `
      <span class="gif-tag">#${gif.username || 'GIF'}</span>
      <button class="gif-close"></button>
    `;

    const imgElement = document.createElement("img");
    imgElement.src = gif.images.fixed_height.url;
    imgElement.alt = gif.title || 'GIF';

    const button = document.createElement('button');
    button.textContent = 'Ver más...';
    button.classList.add('gif-button');
    button.addEventListener('click', () => {
      window.open(gif.url, '_blank');
    });


    header.querySelector('.gif-close').addEventListener('click', () => {
      gifCard.remove();
      createGifCard();
    });

    gifCard.appendChild(header);
    gifCard.appendChild(imgElement);
    gifCard.appendChild(button);
    giftContainer.appendChild(gifCard);

  } catch (error) {
    console.error('Error al obtener el GIF:', error);
  }
};

const fetchGifs = async () => {
  giftContainer.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    await createGifCard();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchGifs();
});
