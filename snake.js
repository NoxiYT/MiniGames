const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "right";
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let gameSpeed = 150;  // Уменьшенная скорость

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    if (event.key === "ArrowDown" && direction !== "up") direction = "down";
    if (event.key === "ArrowRight" && direction !== "left") direction = "right";
}

// Обработчики для мобильных кнопок
document.getElementById("left").addEventListener("click", () => direction = (direction !== "right" ? "left" : direction));
document.getElementById("up").addEventListener("click", () => direction = (direction !== "down" ? "up" : direction));
document.getElementById("down").addEventListener("click", () => direction = (direction !== "up" ? "down" : direction));
document.getElementById("right").addEventListener("click", () => direction = (direction !== "left" ? "right" : direction));

function drawGame() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box));

    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "left") head.x -= box;
    if (direction === "up") head.y -= box;
    if (direction === "down") head.y += box;
    if (direction === "right") head.x += box;

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(game);
        alert("Игра окончена!");
        location.reload();
    }

    snake.unshift(head);
}

let game = setInterval(drawGame, gameSpeed);