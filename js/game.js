import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, score } from './sanke.js';
import {update as updateFood, draw as drawFood} from './food.js';
import {outSideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
let speed = document.getElementById('speed');
const gameBoard = document.getElementById('game-board');
const increaseSpeedButton = document.getElementById('incease');
const decreaseSpeedButton = document.getElementById('decease');
const confirmBtn = document.getElementById('confirm');
const color = document.getElementById('color');
const fail = document.getElementById('fail');
if(!localStorage.getItem('speedVal')){
    localStorage.setItem('speedVal', 4);
    window.location = '/';
}
speed.value = localStorage.getItem('speedVal');
increaseSpeedButton.addEventListener('click', () => {
    let speedVal = document.getElementById('speed').value;
    document.getElementById('speed').value = parseInt(speedVal) + 1;
    decreaseSpeedButton.removeAttribute('disabled')
});

decreaseSpeedButton.addEventListener('click', () => {
    let speedVal = document.getElementById('speed').value;
    if(speedVal>1){
        document.getElementById('speed').value = parseInt(speedVal) - 1;
        decreaseSpeedButton.removeAttribute('disabled');
    }else
        decreaseSpeedButton.setAttribute('disabled', 'disabled');
});

color.addEventListener('input', (event) => {
    gameBoard.style.background = event.target.value;
}, false);

confirmBtn.addEventListener('click', function setSpeedValue() {
    let speedVal = document.getElementById('speed').value;
    localStorage.setItem('speedVal', speedVal);
    window.location = '/';
});



function main(currentTime) {
    if(gameOver){
        if(confirm('You lost. Press OK to restart.')) window.location = '/';
        return 
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return 

    lastRenderTime = currentTime;
    update()
    draw()
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML='<span id="score">'+(score()-1)+'</span>';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection();
    if(gameOver) fail.play();
}
