const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const restartBtn = document.getElementById('restart-btn');
const whackSound = document.getElementById('whack-sound');

let score = 0;
let timeLeft = 30;
let gameInterval;
let moleInterval;
let gameActive = false;

const holes = [];

// Create the holes on the game board
for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.dataset.index = i;
    hole.addEventListener('click', handleWhack);
    gameBoard.appendChild(hole);
    holes.push(hole);
}

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    gameActive = true;
    restartBtn.disabled = true;

    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        } else {
            clearInterval(gameInterval);
            clearInterval(moleInterval);
            gameActive = false;
            alert('Game Over! Your score: ' + score);
            restartBtn.disabled = false;
        }
    }, 1000);

    moleInterval = setInterval(showMole, 800);
}

// Show a mole at a random hole
function showMole() {
    if (!gameActive) return;

    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const mole = document.createElement('div');
    mole.classList.add('mole');
    randomHole.appendChild(mole);

    setTimeout(() => {
        mole.classList.add('show');
    }, 100);

    // Hide mole after a short time
    setTimeout(() => {
        mole.classList.remove('show');
        randomHole.removeChild(mole);
    }, 1000);
}

// Handle whacking a mole
function handleWhack(event) {
    if (!gameActive) return;

    const hole = event.target;
    const mole = hole.querySelector('.mole');

    if (mole && mole.classList.contains('show')) {
        score++;
        scoreDisplay.textContent = score;
        whackSound.play();
        mole.classList.remove('show');
        hole.removeChild(mole);
    }
}

// Restart the game
restartBtn.addEventListener('click', () => {
    clearInterval(gameInterval);
    clearInterval(moleInterval);
    gameActive = false;
    startGame();
});

// Start the game when the page loads
startGame();
