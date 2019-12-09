const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const cards = document.querySelector(".cards"); // Cards Div to append to
const cardCollection = cards.children;
const inputDoggos = document.querySelector("input"); // Input Slider
const playGame = document.querySelector(".button--play-game"); // Play-Game Button
const startOver = document.querySelector(".button--start-over"); // Start-Over Button

// Internal Array of Doggos
let allTheCards = []; // [ [1, 2], [ 3,4 ], [ 5,6 ] ]

// 1 Play Game!
playGame.addEventListener("click", function() {
  deleteCards(); // First delete cards
  createCards(inputDoggos.value); // Create the amount of cards given by the value of the slider
});

// 2 Start Over!
startOver.addEventListener("click", function() {
  deleteCards();
});


// This will create the amount of Doggo Cards
function createCards(amountOfCards) {
  let j = 0;
  let subCardArr = [];

  for (let i = 0; i < amountOfCards; i++) {
    let newCard = document.createElement("div");
    newCard.className = "card card--back";

    // Creates an array of arrays
    if (j === 1) {
      subCardArr.push(newCard);
      allTheCards.push(subCardArr); // Push to array of Internal doggos 
      subCardArr = []
      j = 0;
    } else {
      subCardArr.push(newCard);
      j = j + 1;
    }

    // The 
    cards.appendChild(newCard); 
  }

  // Cards must exist to add eventListener to all of them
  const eachCard = Array.prototype.slice.call(cardCollection); // Convert to Array
  eachCard.forEach(card => card.addEventListener("mousedown", flipCard));
}

// Delete all the Doggos :'(
function deleteCards() {
  cards.querySelectorAll("*").forEach(n => n.remove());
  // Delete the ALL cards Array
  allTheCards = [];
}

function flipCard() {
  // Adds a toggle to the class that transforms the background
  this.classList.toggle("card--front");

}

//function addNewDoggo() {
//const promise = fetch(DOG_URL);
//promise
//.then(function(response) {
//const processingPromise = response.json();
//return processingPromise;
//})
//.then(function(processedResponse) {
//const img = document.createElement("img");
//img.classList = "doggo";
//img.src = processedResponse.message;
//img.alt = "Cute doggo";
//doggos.appendChild(img);
//});
//}
//document
//.querySelector(".button--add-doggo")
//.addEventListener("click", addNewDoggo);
