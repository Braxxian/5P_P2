function modal() {
    let modal = document.getElementById("how-to-play");
    modal.style.display = "block";
}
function closeModal() {
    let modal = document.getElementById("how-to-play");
    modal.style.display = "none";
}
window.onload = function () {
    assembleDeck();
}
function assembleDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["C", "D", "H", "S"];
    deck = [];
    for (let suit in suits) {
        for (let value in values) {
            deck.push(values[value] + "-" + suits[suit]);
        }
    }
    console.log(deck);

}