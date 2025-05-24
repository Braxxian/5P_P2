/* Game code was based on a walkthrough project by 'Kenny Yip'
 The code has been re-written, freely adapted and built upon, in an original manner
 to fit the purposes of this project. For full details see Credits
 in the README*/

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

//track dealer's hidden card
let cardBack;

// boolean for 'hit-me' condition
let hitMe = true;

window.onload = function () {
    assembleDeck();
    shuffle();
    playerStart();

};
// populates the deck array with all 52 cards
const assembleDeck = () => {
    deck = [];
    for (let suit in suits) {
        if (suits.hasOwnProperty(suit)) {
            for (let value in values) {
                if (values.hasOwnProperty(value)) {
                    deck.push(values[value] + "-" + suits[suit]);
                }
            }
        }
    }
};
//uses the 'temp var swap' method to cycle random placement of cards
const shuffle = () => {
    for (let i in deck) {
        if (deck.hasOwnProperty(i)) {
            let random = Math.floor(Math.random() * 52);
            let swap = deck[i];
            deck[i] = deck[random];
            deck[random] = swap;
        }
    }
};

const dealerTurn = () => {
    if (playerHand < 15 || hitMe) {
        let rules = document.getElementById("win-lose");
        rules.textContent = "You must play first!"
        rules.style.fontSize = "2rem";
        return;
    }
    cardBack = deck.shift();
    dealerHand += getValue(cardBack);
    dealerAce += checkAce(cardBack);
    //get dealer cards
    while (dealerHand < 17) {
        let dealtCard = document.createElement("img");
        let card = deck.shift();
        dealtCard.src = "assets/images/cards/" + card + ".webp";
        dealtCard.className = "card-size";
        dealerHand += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(dealtCard);
        let showDealerScore = document.getElementById("dealer-score");
        showDealerScore.textContent = `Dealer: ${dealerHand}`;
    }
    winnerDecide();

};
//give player two starting cards
const playerStart = () => {
    for (let i = 0; i < 2; i++) {
        let dealtCard = document.createElement("img");
        let card = deck.shift();
        dealtCard.src = "assets/images/cards/" + card + ".webp";
        dealtCard.className = "card-size";
        playerHand += getValue(card);
        playerAce += checkAce(card);
        document.getElementById("player-cards").append(dealtCard);
    }
    let showPlayerScore = document.getElementById("player-play");
    showPlayerScore.textContent = `Draw: ${playerHand}`;
    document.getElementById("player-play").addEventListener("click", deal);
    document.getElementById("stay").addEventListener("click", stay);
};
// removes the "-" and returns an array [value, suit]
const getValue = (card) => {
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
};
// checks if a player is holding an ace
const checkAce = (card) => {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
};
// chooses the lower value of ace if otherwise 'bust'
const lesserAce = () => {
    while (playerHand > 21 && playerAce > 0) {
        playerHand -= 10;
        playerAce -= 1;
    }
    return playerHand;
};
// deal card to player
const deal = () => {
    if (!hitMe && playerHand > 21) {
        const rules = document.getElementById("win-lose");
        rules.textContent = "You are BUST & cannot draw"
        rules.style.fontSize = "2rem";
        return;
    } else if (!hitMe) {
        const rules = document.getElementById("win-lose");
        rules.textContent = "You decided to Stay, Dealers Turn"
        rules.style.fontSize = "2rem";
        return;
    }
    let dealtCard = document.createElement("img");
    let card = deck.shift();
    dealtCard.src = "assets/images/cards/" + card + ".webp";
    dealtCard.className = "card-size";
    playerHand += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(dealtCard);
    if (lesserAce(playerHand, playerAce) > 21) {
        hitMe = false;
    }
    let showPlayerScore = document.getElementById("player-play");
    showPlayerScore.textContent = `Draw: ${playerHand}`;
};
const stay = () => {
    if (playerHand < 15) {
        const rules = document.getElementById("win-lose");
        rules.textContent = "You must have 15 plus to stay!"
        rules.style.fontSize = "2rem";
    } else
        hitMe = false;
};
const winnerDecide = () => {
    document.getElementById("dealer-card-1").src = "assets/images/cards/" + cardBack + ".webp";
    if (playerHand > 21) {
        const bust = document.getElementById("win-lose");
        bust.textContent = "You went Bust!"
        bust.style.fontSize = "4rem";
    } else if (dealerHand > 21) {
        const won = document.getElementById("win-lose");
        won.textContent = "You Win!"
        won.style.fontSize = "4rem";
    } else if (playerHand == dealerHand) {
        const tie = document.getElementById("win-lose");
        tie.textContent = "Tie Banker Wins!"
        tie.style.fontSize = "4rem";
    } else if (playerHand > dealerHand) {
        const win = document.getElementById("win-lose");
        win.textContent = "You Win!"
        win.style.fontSize = "4rem";
    } else if (playerHand < dealerHand) {
        const lose = document.getElementById("win-lose");
        lose.textContent = "You Lose!"
        lose.style.fontSize = "4rem";
    }

};














