const DOG_URL = "https://dog.ceo/api/breeds/image/random"; // DOG CEO Random API

const cards = document.querySelector(".cards"); // Cards Section to append cards to
const cardCollection = cards.children; // The children of the cards (imgs)
const inputDoggos = document.querySelector("input"); // Input Slider
const playGameButton = document.querySelector(".button--play-game"); // Play-Game Button

let doggoImages = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg"];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// PLAY GAME!
playGameButton.addEventListener("click", function () {
  // 1 FIRST DELETE CARDS
  deleteCards();

  // 2 CALL THE API
  //getDoggos(inputDoggos.value);

  // 3 CREATE THE CARDS INPUT
  //createCards(inputDoggos.value);
  createCards(8); //TESTING

  // 4 GIVE CARDS THE DOGGO IMAGES
  renderCards();

  // 5 SHUFFLE CARDS
  shuffleCards(8);
});

function addNewDoggo() {
  /**
   * Calls the dog.ceo API and creates and the doggoImages array
   * This will become the front of the cards
   */
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      const img = document.createElement("img");
      img.classList = "doggo";
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}

function createCards(amountOfCards) {
  /**
   * Creates the DIV cards based on slider input
   * Does not populate the front card with random images
   */
  for (let i = 0; i < amountOfCards; i++) {
    // Create the Div
    let newCard = document.createElement("div");

    // Append the front/back images
    let backOfCard = document.createElement("img");
    let frontOfCard = document.createElement("img");

    newCard.className = "card";
    backOfCard.className = "card--back";
    frontOfCard.className = "card--front";
    backOfCard.src = "./img/doggo2.jpg";
    frontOfCard.src =
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/300px-Original_Doge_meme.jpg";

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

    // Back Card img
    eachCard[cardCounter].children[1].src = doggoImages[imageCounter];

    // Add Flip Card Event Listener to each card
    eachCard[cardCounter].addEventListener("click", flipCard);
  }
}

function deleteCards() {
  /**
   * Selects all the cards and removes them from the card section
   */
  cards.querySelectorAll("*").forEach((n) => n.remove()); // Select all the cards with .class
}

function flipCard() {
  /**
   * Adds a toggle to class to the card  element
   * That transforms the background from back to front
   */
  if (lockBoard) return; // Edgecase lockboard after firstCard click
  if (this === firstCard) return; // Edgecase secondCard cannot be firstCard too

  this.classList.add("flip");

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
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1420);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null,  null];
}

function shuffleCards(numberofCards) {
  cards.querySelectorAll("*").forEach(card => {
  let randomPos = Math.floor(Math.random() * numberofCards);
    card.style.order = randomPos;
  });
}
