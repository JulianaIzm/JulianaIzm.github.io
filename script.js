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
let firstBlock = new Block(0, 5);
firstBlock.square('#02451C');
let firstCircle = new Block(4,3);
firstCircle.round('red');

