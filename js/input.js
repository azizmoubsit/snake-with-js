let inputDirection = {x: 0, y: 0};
let lasInputDirection = {x: 0, y: 0};

window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if(lasInputDirection.x !== 0) break;
            inputDirection = {x:-1, y:0};
            break;
        case 'ArrowDown':
            if(lasInputDirection.x !== 0) break;
            inputDirection = {x:1, y:0};
            break;
        case 'ArrowLeft':
            if(lasInputDirection.y !== 0) break;
            inputDirection = {x:0, y:-1};
            break;
        case 'ArrowRight':
            if(lasInputDirection.y !== 0) break;
            inputDirection = {x:0, y:1};
            break;
    }
})

export function getInputDirection() {
    lasInputDirection = inputDirection;
    return inputDirection
} 