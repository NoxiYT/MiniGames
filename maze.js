const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const box = 40;
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let player = { x: 1, y: 1 };

function drawMaze() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    maze.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(x * box, y * box, box, box);
            }
        });
    });

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * box, player.y * box, box, box);
}

function movePlayer(dir) {
    let newX = player.x + (dir === "right") - (dir === "left");
    let newY = player.y + (dir === "down") - (dir === "up");
    if (maze[newY][newX] === 0) player = { x: newX, y: newY };
    drawMaze();
}

document.querySelectorAll("#controls button").forEach(btn => btn.addEventListener("click", () => movePlayer(btn.id)));

drawMaze();