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
// let firstCircle = new Block(4,3);
// firstCircle.round('red');

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
}
let cobra = new Snake;
cobra.drawSnake();

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