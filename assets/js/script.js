let modal = () => {
    let modal = document.getElementById("how-to-play");
    modal.style.display = "block";
}
let closeModal = () => {
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

//track dealer's hidden card
let cardBack;

// boolean for 'hit-me' condition
let hitMe = true;

window.onload = function () {
    assembleDeck();
    shuffle();
    startGame();
}
// populates the deck array with all 52 cards
let assembleDeck = () => {
    deck = [];
    for (let suit in suits) {
        for (let value in values) {
            deck.push(values[value] + "-" + suits[suit]);
        }
    }
}
//uses the 'temp var swap' method to cycle random placement of cards
let shuffle = () => {
    for (let i in deck) {
        let random = Math.floor(Math.random() * 52);
        let swap = deck[i];
        deck[i] = deck[random];
        deck[random] = swap;
    }
}

let startGame = () => {
    cardBack = deck.shift();
    dealerHand += getValue(cardBack);
    dealerAce += checkAce(cardBack);

    while (dealerHand < 17) {
        let dealtCard = document.createElement("img");
        let card = deck.shift();
        dealtCard.src = "assets/images/cards/" + card + ".png";
        dealtCard.style.width = "80px";
        dealerHand += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(dealtCard);
    }
    console.log(dealerHand);
}
// removes the "-" and returns an array [value, suit]
let getValue = (card) => {
    let cardValue = card.split("-");
    let value = cardValue[0];
    // assigns numeric value to ace & picture cards
    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    //returns card string value as an integer
    return parseInt(value);
}
let checkAce = (card) => {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}










