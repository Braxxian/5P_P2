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
    playerStart();
    /*startGame();*/
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

let dealerTurn = () => {
    cardBack = deck.shift();
    dealerHand += getValue(cardBack);
    dealerAce += checkAce(cardBack);
    //get dealer cards
    while (dealerHand < 17) {
        let dealtCard = document.createElement("img");
        let card = deck.shift();
        dealtCard.src = "assets/images/cards/" + card + ".png";
        dealtCard.className = "card-size";
        dealerHand += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(dealtCard);
        let showDealerScore = document.getElementById("dealer-score");
        showDealerScore.textContent = `Dealer: ${dealerHand}`;
    }
}
//give player two starting cards
let playerStart = () => {
    for (let i = 0; i < 2; i++) {
        let dealtCard = document.createElement("img");
        let card = deck.shift();
        dealtCard.src = "assets/images/cards/" + card + ".png";
        dealtCard.className = "card-size";
        playerHand += getValue(card);
        playerAce += checkAce(card);
        document.getElementById("player-cards").append(dealtCard);
    }
    document.getElementById("player-play").addEventListener("click", deal);
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
let lesserAce = () => {
    while (playerHand > 21 && playerAce > 0) {
        playerHand -= 10;
        playerAce -= 1;
    }
    return playerHand;
}
// deal card to player
let deal = () => {
    if (!hitMe) {
        window.alert("You are bust! You cannot draw more cards")
        return;
    }
    let dealtCard = document.createElement("img");
    let card = deck.shift();
    dealtCard.src = "assets/images/cards/" + card + ".png";
    dealtCard.className = "card-size";
    playerHand += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(dealtCard);
    console.log(playerHand);
    if (lesserAce(playerHand, playerAce) > 21) {
        hitMe = false;
    }
    let showPlayerScore = document.getElementById("player-play");
    showPlayerScore.textContent = `Hit: ${playerHand}`;
}











