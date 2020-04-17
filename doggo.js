const DOG_URL = "https://dog.ceo/api/breeds/image/random"; // DOG CEO Random API

const cards = document.querySelector(".cards"); // Cards Section to append cards to
const cardCollection = cards.children; // The children of the cards (imgs)
const inputDoggos = document.querySelector("input"); // Input Slider
const playGame = document.querySelector(".button--play-game"); // Play-Game Button
const startOver = document.querySelector(".button--start-over"); // Start-Over Button

// Internal Array of Doggos
let allTheCards = []; // [ [1, 2], [ 3,4 ], [ 5,6 ] ]

// 1 PLAY GAME BUTTON!
playGame.addEventListener("click", function () {
  // First delete cards
  deleteCards();
  createCards(inputDoggos.value); // Create the amount of cards given by the value of the slider
});

// 2 START OVER BUTTON!
startOver.addEventListener("click", function () {
  //Just delete the cards
  deleteCards();
});

// This will create the amount of Doggo Cards based on input passed in
function createCards(amountOfCards) {
  let j = 0;
  let subCardArr = [];

  for (let i = 0; i < amountOfCards; i++) {
    // Create Card
    // First new div
    let newCard = document.createElement("div");
    // Next the back img
    let backOfCard = document.createElement("img");
    let frontOfCard = document.createElement("img")
    newCard.className = "card";
    backOfCard.className = "card--back";
    frontOfCard.className = "card--front";
    backOfCard.src = "./img/doggo2.jpg";
    frontOfCard.src = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/300px-Original_Doge_meme.jpg";

    // INTERNAL: Creates an array of arrays
    //if (j === 1) {
      //subCardArr.push(newCard);
      //// Push to array of Internal doggos
      //allTheCards.push(subCardArr);
      //subCardArr = [];
      //j = 0;
    //} else {
      //subCardArr.push(newCard);
      //j = j + 1;
    //}

    // Put the back of card into the 
    newCard.appendChild(backOfCard);
    newCard.appendChild(frontOfCard);

    // Put the div
    cards.appendChild(newCard);
  }

  // Cards must exist to add eventListener to all of them
  const eachCard = Array.prototype.slice.call(cardCollection); // Convert to Array
  // Add Flip Card Event Listener to each card
  eachCard.forEach((card) => card.addEventListener("mousedown", flipCard));
}

// Delete all the Cards
function deleteCards() {
  cards.querySelectorAll("*").forEach((n) => n.remove()); // Select all the cards with .class
  // Delete the ALL cards Array
  allTheCards = [];
}

function flipCard() {
  // Adds a toggle to the class that transforms the background
      
  this.classList.toggle("flip");
  console.log(this);
}

// Call APII
function addNewDoggo() {
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

document
  .querySelector(".button--add-doggo")
  .addEventListener("click", addNewDoggo);
