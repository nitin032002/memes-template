
const memeContainer = document.getElementById('meme-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let memeData = [];

fetch('https://api.imgflip.com/get_memes')
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      memeData = data.data.memes;
      renderMemes(memeData); 
    } else {
      displayError('Failed to load memes. Please try again later.');
    }
  })
  .catch((error) => {
    console.error('Error fetching memes:', error);
    displayError('An error occurred. Please check your internet connection.');
  });

function renderMemes(memes) {
  memeContainer.innerHTML = ''; 
  memes.forEach((meme) => {
    const memeElement = document.createElement('div');
    memeElement.className = 'meme';
    memeElement.innerHTML = `
      <img src="${meme.url}" alt="${meme.name}" />
      <p>${meme.name}</p>
    `;
    memeContainer.appendChild(memeElement);
  });
}

function displayError(message) {
  memeContainer.innerHTML = `<p>${message}</p>`;
}

function filterMemes() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMemes = memeData.filter((meme) =>
    meme.name.toLowerCase().includes(searchTerm)
  );
  renderMemes(filteredMemes); 
}

searchInput.addEventListener('input', filterMemes);
searchButton.addEventListener('click', filterMemes);
