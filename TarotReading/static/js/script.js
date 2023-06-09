// Function to fetch the list of background image URLs
function fetchBackgroundImages() {
  return fetch('/static/images/backgrounds/')
    .then(response => response.json())
    .then(data => {
      // Assuming the response is an array of image file names
      return data.map(fileName => `/static/images/backgrounds/${fileName}`);
    });
}

// Function to change the background image
function changeBackgroundImage() {
  const body = document.body;
  let currentIndex = 0;
  let backgroundImages = [];

  fetchBackgroundImages()
    .then(images => {
      backgroundImages = images;

      setInterval(() => {
        currentIndex = (currentIndex + 1) % backgroundImages.length;
        body.style.backgroundImage = `url(${backgroundImages[currentIndex]})`;
      }, 5000); // Change image every 5 seconds
    })
    .catch(error => {
      console.error('Failed to fetch background images:', error);
    });
}

// Call the function to start changing the background image
changeBackgroundImage();

// Function to get the image file name for a tarot card
function getCardImageFileName(cardName) {
  // Remove spaces and convert to lowercase
  let fileName = cardName.replace(/ /g, '').toLowerCase();
  // Add the file extension
  fileName += '.jpg'; // Change the extension if needed
  return fileName;
}

// Event listener for the "Start Tarot Reading" button
document.getElementById('start-reading').addEventListener('click', function () {
  var question = document.getElementById('question').value;
  fetch('/start-reading', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question: question })
  })
    .then(response => response.json())
    .then(data => {
      var results = 'Cards drawn: ' + data.cards.join(', ') + '\n\nInterpretations:\n' + data.interpretations.join('\n') + '\n\nHolistic understanding:\n' + data.holistic_understanding;
      document.getElementById('reading-results').innerText = results;

      // Display card images and titles
      var cardImagesContainer = document.getElementById('card-images-container');
      cardImagesContainer.innerHTML = ''; // Clear existing images

      data.cards.forEach((card, index) => {
        var cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        var cardImage = document.createElement('img');
        cardImage.src = './static/images/tarot_images/' + getCardImageFileName(card);
        cardContainer.appendChild(cardImage);

        var cardTitle = document.createElement('p');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = card;
        cardContainer.appendChild(cardTitle);

        cardImagesContainer.appendChild(cardContainer);
      });

      // Show the reading results
      document.getElementById('reading-results').style.display = 'block';
    });
});
