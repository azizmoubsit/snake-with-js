import {onSnake, expandSnake} from './sanke.js'
import {randomGridPosition} from './grid.js';

let food = getRandomFoodPosition();
const son = document.getElementById('son');
const EXPANION_RATE = 1;

export function update() {
    if(onSnake(food)) {
        expandSnake(EXPANION_RATE);
        son.play();
        food = getRandomFoodPosition();
    }
}

export function  draw(gameBoard) {
    const foodElement  = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}