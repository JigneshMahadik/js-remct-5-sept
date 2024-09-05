// Initialize card values
const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];

let attempts = document.getElementById("attempts");
var attempts_count = 0;

// Shuffle the card values
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const shuffledValues = shuffle(cardValues);


// Create the game board
const gameBoard = document.getElementById('gameBoard');
shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = `<span class="hidden">${value}</span>`;
    gameBoard.appendChild(card);
});


// Initial selected card values
let firstCard = null;
let secondCard = null;
let lockBoard = false;


// Flip the card when it gets selected
function flipCard() {
    if(lockBoard){
        return;
    }
    if(firstCard === this){
        return;
    }
    this.classList.add('flipped');
    this.querySelector('.hidden').classList.remove('hidden');
    
    if(!firstCard){
        firstCard = this;
    }
    else{
        secondCard = this;
        checkForMatch();
    }
    
    attempts_count++;
    attempts.innerHTML = attempts_count;
}



// Checks whether selected cards are matching or not
function checkForMatch(){
    if(firstCard.dataset.value === secondCard.dataset.value){
        disableCards()
    }
    else{
        unflipCards();
    }
}


// Function to disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


// Function to unflip unmatched cards
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('span').classList.add('hidden');
        secondCard.querySelector('span').classList.add('hidden');
        resetBoard();
    }, 1500);
}


// Function to reset the board
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}


// Add event listeners to all cards
document.querySelectorAll('.card')
.forEach((card) => {
    card.addEventListener('click', flipCard)
    attempts.innerHTML = attempts_count;
});


// Reset game button
document.getElementById('resetButton').addEventListener('click', () => {
    gameBoard.innerHTML = '';
    const shuffledValues = shuffle(cardValues);
    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = `<span class="hidden">${value}</span>`;
        gameBoard.appendChild(card);
    });
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
    attempts_count = 0;
    attempts.innerHTML = attempts_count;
});
