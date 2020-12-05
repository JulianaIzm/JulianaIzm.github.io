"use strict";

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;
function drawScore() {
    ctx.textBaseline = 'bottom';
    ctx.font = "10px Arial";
    ctx.fillText('Счет: ' + score, blockSize, blockSize);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'Black';
}

// drawScore();

class Block {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    square(color) { //рисуем квадратики
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
    }
    round(color) {
        let centerX = this.col * blockSize + blockSize / 2;
        let centerY = this.row * blockSize + blockSize / 2;
        let pi = Math.PI;
        ctx.fillStyle = color;
        ctx.arc(centerX, centerY, blockSize/2, 0, 2*pi, true);
        ctx.fill();
    }
}
let firstBlock = new Block(0, 0);
firstBlock.square('#02451C');

class Snake {
    constructor() {
        this.parts = [
            new Block(7, 4),
            new Block(6, 4),
            new Block(5, 4)
        ];
    }
    drawSnake() {
        for (let i = 0; i < this.parts.length; i++) {
            this.parts[i].square('#8136a4');
        }
    }
    moveSnake() {
        let head = this.parts[0],
        newHead;
        this.direction = this.nextDirection;
        if (this.direction === "right") {
            newHead = new Block(head.col + 1, head.row);
        } else if (this.direction === "down") {
            newHead = new Block (head.col, head.row + 1);
        } else if (this.direction === "left") {
            newHead = new Block(head.col - 1, head.row);
        } else if (this.direction === "up") {
            newHead = new Block(head.col, head.row - 1);
        }
        this.parts.unshift(newHead);
    }
    setDirection(newDirection) {
        this.nextDirection = newDirection;
    }
}
let serpent = new Snake;
serpent.drawSnake();

class Apple {
    constructor() {
        this.position = new Block(10, 10);
    }
    drawApple() {
        this.position.round("red");
    }
    moveApple() {
        let randomCol = Math.floor(Math.random() * widthInBlocks);
        let randomRow = Math.floor(Math.random() * heightInBlocks);
        this.position = new Block(randomCol, randomRow);
    }
}
let apple = new Apple();
apple.moveApple();
apple.drawApple();

let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
};

document.body.addEventListener("keydown", function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        serpent.setDirection(newDirection);
    }
})
