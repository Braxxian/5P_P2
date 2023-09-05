function modal() {
    let modal = document.getElementById("how-to-play");
    modal.style.display = "block";
}
function closeModal() {
    let modal = document.getElementById("how-to-play");
    modal.style.display = "none";
}
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["C", "D", "H", "S"];
let deck = [];

//track hands values
let dealerHand = 0;
let playerHand = 0;

//track aces in a hand
let playerAce = 0;
let dealerAce = 0;

//track hidden card
let cardBack;

// boolean for 'hit-me' condition
let hitMe = true;


window.onload = function () {
    assembleDeck();
    shuffle();
    startGame();
    console.log(deck);

}

function assembleDeck() {
    deck = [];
    for (let suit in suits) {
        for (let value in values) {
            deck.push(values[value] + "-" + suits[suit]);
        }
    }
}
function shuffle() {
    for (let i in deck) {
        let random = Math.floor(Math.random() * 52);
        let swap = deck[i];
        deck[i] = deck[random];
        deck[random] = swap;
    }
}
function startGame() {
    cardBack = deck.shift();
    dealerHand += getValue(cardBack);

}
function getValue(card) {
    let showCardBack = card.split("-");
}









