const inputSearch = document.getElementById('search');
const buttonSearch = document.getElementById('btn-search');
const containerSearch = document.getElementById('results-search');

// Crear un contenedor para errores
const errorDiv = document.createElement('div');
errorDiv.id = 'error-message';
errorDiv.style.color = 'red';
errorDiv.style.marginTop = '10px';

// Asegúrate de insertarlo correctamente
containerSearch.parentNode.insertBefore(errorDiv, containerSearch);

// Evento en el botón
buttonSearch.addEventListener('click', () => {
  const search = inputSearch.value.trim();

  // Limpia cualquier error previo
  errorDiv.textContent = '';

  if (search) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=10`)
      .then(response => response.json())
      .then(data => {
        containerSearch.innerHTML = ''; // Limpia resultados previos
        if (data.data.length === 0) {
          errorDiv.textContent = 'No se encontraron GIFs para esa búsqueda.';
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
        errorDiv.textContent = 'Ocurrió un error al buscar los GIFs. Inténtalo de nuevo.';
      });
  } else {
    errorDiv.textContent = 'Por favor, escribe algo para buscar.';
  }
});
