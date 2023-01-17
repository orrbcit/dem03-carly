// Board
const BLOCKSIZE = 25;
const ROWS = 20;
const COLS = 30;

let board;
let context;

// Snake head
let snakeX = BLOCKSIZE * COLS/2;
let snakeY = BLOCKSIZE * ROWS/2;
let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// Food
let foodX;
let foodY;
placeFood();

// Score
let score = 0;

let dead = false;

window.onload = function() {
    board = document.getElementById('board');
    board.height = ROWS * BLOCKSIZE;
    board.width = COLS * BLOCKSIZE;
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keydown', input);
    setInterval(update, 100);
}

function update() {
    if (!dead) {
        // Draw board
        context.fillStyle = 'black';
        context.fillRect(0, 0, board.width, board.height);

        // Food collision
        if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([snakeX, snakeY]);
            placeFood();
            score++;
        }

        // Wall collision
        if (snakeX < 0 || snakeY < 0) dead = true;
        if (snakeX == BLOCKSIZE * COLS || snakeY == BLOCKSIZE * ROWS) dead = true;
        
        // Move snake body
        for (let i = snakeBody.length-1; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];
        }
        // Move neck to head
        if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];
        
        // Move snake head
        snakeX += velocityX * BLOCKSIZE;
        snakeY += velocityY * BLOCKSIZE;

        // Body collision
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) dead = true;
        }
        
        // Draw snake head
        context.fillStyle = 'limegreen';
        context.fillRect(snakeX, snakeY, BLOCKSIZE, BLOCKSIZE);
            
        // Draw food
        context.fillStyle = 'red'
        context.fillRect(foodX, foodY, BLOCKSIZE, BLOCKSIZE);

        // Draw snake body
        context.fillStyle = 'limegreen';
        snakeBody.forEach(segment => {
            context.fillRect(segment[0], segment[1], BLOCKSIZE, BLOCKSIZE);
        });
        
        // Draw score
        context.fillStyle = 'white';
        context.font = '20pt Helvetica';
        context.fillText(score, BLOCKSIZE, BLOCKSIZE * 1.5);
    } else {

        // Death screen
        context.fillStyle = 'red';
        context.fillRect(0, 0, board.width, board.height);

        // Draw final score
        context.fillStyle = 'white';
        context.font = '70pt Helvetica';
        context.fillText('Score: ' + score, BLOCKSIZE * COLS/2 - BLOCKSIZE*8, BLOCKSIZE * ROWS/2);
        context.font = '20pt Helvetica';
        context.fillText('Press Space to play again', BLOCKSIZE * COLS/2 - BLOCKSIZE*7, BLOCKSIZE * ROWS/2 + BLOCKSIZE*5);
    }
}

function input(e) {
        e.preventDefault();
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    if (e.code == 'Space' && dead) {
        snakeX = BLOCKSIZE * ROWS/2;
        snakeY = BLOCKSIZE * COLS/2;
        velocityX = 0;
        velocityY = 0;
        placeFood();
        score = 0;
        snakeBody = [];
        dead = false;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * COLS) * BLOCKSIZE;
    foodY = Math.floor(Math.random() * ROWS) * BLOCKSIZE;
}