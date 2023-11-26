/********************************************************************* 
** Variables
*********************************************************************/ 
const DOG_URL = "https://dog.ceo/api/breeds/image/random"; // DOG CEO Random API

const cards = document.querySelector(".cards"); // Cards Section to append cards to
const cardCollection = cards.children; // The children of the cards (imgs)
const inputDoggos = document.querySelector("input"); // Input Slider
const playGameButton = document.querySelector(".button--play-game"); // Play-Game Button

let images = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg"];
let doggoImages;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

document.addEventListener('DOMContentLoaded', function () {
    // Event listener for slider input
    inputDoggos.addEventListener('input', createCards);

    // Initial creation based on default slider value
    createCards();

  // PLAY GAME!
  playGameButton.addEventListener('click', function () {
    // 3 CALL THE API
    getDoggos(inputDoggos.value / 2); // Rest of methods called here
    playGameButton.innerHTML = 'Game Started';
  });
});


function getDoggos(amountOfDoggos) {
  /**
   * Calls the dog.ceo API and creates and the doggoImages array
   * This will become the front of the cards
   */
  if (amountOfDoggos > 20) {
    alert(`How dare you hack this, max is 20 doggos!\n not ${amountOfDoggos} `);
    return;
  }

  doggoImages = []; // Set to empty array first
  const promise = fetch(`${DOG_URL}/${amountOfDoggos}`);
  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      for (let dog of processedResponse['message']) {
        doggoImages.push(dog);
      }


      // 4 GIVE CARDS THE DOGGO IMAGES
      renderCards();

      // 5 SHUFFLE CARDS
      shuffleCards(inputDoggos.value);

    });

    playGameButton.innerHtml = 'Game Started!';
}

function createCards() {
  /**
   * Creates the DIV cards based on slider input
   * Does not populate the front card with random images
   */
  deleteCards();

  // Update Play Game Button
  playGameButton.innerHTML = 'Play Game!';

  const dogCardAmount = parseInt(inputDoggos.value);

  for (let i = 0; i < dogCardAmount; i++) {
    // Create the Div
    const newCard = document.createElement('div');

    // Append the front/back images
    const backOfCard = document.createElement('img');
    const frontOfCard = document.createElement('img');

    newCard.className = 'card';
    backOfCard.className = 'card--back';
    frontOfCard.className = 'card--front';
    backOfCard.src = './img/doggo2.jpg';
    //frontOfCard.src =
    //"https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/300px-Original_Doge_meme.jpg";

    // Append images: Div>BackImg>FrontImg
    newCard.appendChild(backOfCard);
    newCard.appendChild(frontOfCard);
    cards.appendChild(newCard);
  }
}

function renderCards() {
  /**
   * Populates the front card with random images
   * Gives each card an event listener
   */
  const eachCard = Array.prototype.slice.call(cardCollection); // Convert to Array

  let imageCounter = 0;
  for (let cardCounter = 0; cardCounter < eachCard.length; cardCounter++) {
    // If the CardCounter is passed the first 2 AND the last two cards match,
    // we increment the image Counter
    // Transforms array [1,2,3,4,5,6,7,8] --> [1,1,2,2,3,3,4,4]
    if (
      cardCounter > 1 &&
      eachCard[cardCounter - 1].children[1].src ==
        eachCard[cardCounter - 2].children[1].src
    ) {
      imageCounter++;
    }

    // Assignment of Back Card img
    eachCard[cardCounter].children[1].src = doggoImages[imageCounter];

    // Add Flip Card Event Listener to each card
    eachCard[cardCounter].addEventListener('mousedown', flipCard);
  }
}

function deleteCards() {
  /**
   * Selects all the cards and removes them from the card section
   */
  // cards.querySelectorAll("*").forEach((n) => n.remove()); // Select all the cards with .class
  cards.innerHTML = '';
}

function flipCard() {
  /**
   * Adds a toggle to class to the card  element
   * That transforms the background from back to front
   */
  if (lockBoard) return; // Edgecase lockboard after firstCard click
  // Edgecase secondCard cannot be firstCard too
  if (this === firstCard) return;
  // Edgecase for repeatedly clicking on an already clicked card
  if (this.classList.contains('flip')) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First Click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second Click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.children[1].src === secondCard.children[1].src) {
    // It's a MATCH!
    disableCards();
  } else {
    // NOT a match
    unflipCards();
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1400);
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards(numberofCards) {
  cards.querySelectorAll("*").forEach((card) => {
    let randomPos = Math.floor(Math.random() * numberofCards);
    card.style.order = randomPos;
  });
}
