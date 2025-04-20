const inputSearch = document.getElementById('search');
const buttonSearch = document.getElementById('btn-search');
const containerSearch = document.getElementById('results-search');

// Elementos del modal
const modal = document.getElementById('error-modal');
const modalText = document.getElementById('modal-error-text');
const closeBtn = document.querySelector('.close-btn');

// Suggestions elements
const suggestionBox = document.createElement('div');
suggestionBox.id = 'suggestions';
suggestionBox.classList.add('suggestions');
inputSearch.parentNode.appendChild(suggestionBox);

function showModalError(message) {
  modalText.textContent = message;
  modal.style.display = 'block';
}

// Cerrar modal al hacer clic en la "X"
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

inputSearch.addEventListener('input', async () => {
  const value = inputSearch.value.trim();
  suggestionBox.innerHTML = '';
  if (value.length === 0) return;

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${value}&limit=3`);
    const data = await response.json();

    data.data.forEach(suggestion => {
      const suggestionDiv = document.createElement('div');
      suggestionDiv.classList.add('suggestion');
      suggestionDiv.textContent = suggestion.title;
      suggestionDiv.style.cursor = 'pointer';

      suggestionDiv.addEventListener('click', () => {
        inputSearch.value = suggestion.title;
        suggestionBox.innerHTML = '';
        buttonSearch.click();
      });

      suggestionBox.appendChild(suggestionDiv);
    });

  } catch (error) {
    console.error('Error al obtener sugerencias:', error);
  }
});

inputSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    buttonSearch.click();
  }
});


document.addEventListener('click', (e) => {
  if (!e.target.closest('#search') && !e.target.closest('#suggestions')) {
    suggestionBox.innerHTML = '';
  }
});

buttonSearch.addEventListener('click', () => {
  const search = inputSearch.value.trim();
  suggestionBox.innerHTML = '';

  console.log(search);

  if (search) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=5`)
      .then(response => response.json())
      .then(data => {
        containerSearch.innerHTML = ''; // Limpia resultados previos
        console.log(data);
        if (data.data.length === 0) {
          showModalError('No se encontraron GIFs para esa búsqueda.');
        } else {
          data.data.forEach((gif) => {
            const gifElement = document.createElement('img');
            gifElement.src = gif.images.fixed_height.url;
            gifElement.alt = gif.title;
            gifElement.style.margin = '10px';
            containerSearch.appendChild(gifElement);
          });
        }
      })
      .catch(error => {
        console.error('Error al traer los GIFs:', error);
        showModalError('Ocurrió un error al buscar los GIFs. Inténtalo de nuevo.');
      });
  } else {
    showModalError('Por favor, escribe algo para buscar.');
  }
});
