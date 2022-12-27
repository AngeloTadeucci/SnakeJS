const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 50;
const SNAKE_START_LENGTH = 3;

let snake = [];
let apple = { x: 10, y: 10 };
let score = 0;
let direction = 'right';

// Initialize the snake with the initial size and place the apple in a random position
for (let i = SNAKE_START_LENGTH - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
}
apple.x = Math.floor(Math.random() * GRID_SIZE);
apple.y = Math.floor(Math.random() * GRID_SIZE);

// Draw each square of the grid
function drawGrid() {
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#000';
            ctx.fillRect(x * 10, y * 10, 10, 10);
            ctx.strokeRect(x * 10, y * 10, 10, 10);
        }
    }
}

// Draw the snake and the apple
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#0f0';
        ctx.strokeStyle = '#0f0';
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
        ctx.strokeRect(segment.x * 10, segment.y * 10, 10, 10);
    });
    ctx.fillStyle = '#f00';
    ctx.strokeStyle = '#f00';
    ctx.fillRect(apple.x * 10, apple.y * 10, 10, 10);
    ctx.strokeRect(apple.x * 10, apple.y * 10, 10, 10);
}

// Update the snake position
function updateSnake() {
    // Add a new segment in the current direction
    let newHead;
    if (direction === 'up') {
        newHead = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === 'down') {
        newHead = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === 'left') {
        newHead = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === 'right') {
        newHead = { x: snake[0].x + 1, y: snake[0].y };
    }
    snake.unshift(newHead);

    // Check if the snake ate the apple
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        score++;
        apple.x = Math.floor(Math.random() * GRID_SIZE);
        apple.y = Math.floor(Math.random() * GRID_SIZE);
    } else {
        // Remove the last segment of the snake if it did not eat the apple
        snake.pop();
    }
}

// Check if the snake collided with the grid limits or with itself
function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= GRID_SIZE ||
        snake[0].y < 0 ||
        snake[0].y >= GRID_SIZE
    ) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Update the score counter
function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Main game update function
function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        // End the game if there is a collision
        clearInterval(gameInterval);
        alert(`Game Over! Your final score was: ${score}`);
    } else {
        // Clear the screen and redraw the grid and the snake
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawSnake();
        updateScore();
    }
}

// Capture keyboard inputs to control the snake
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});

// Start the game loop every 100 milliseconds
const gameInterval = setInterval(gameLoop, 100);