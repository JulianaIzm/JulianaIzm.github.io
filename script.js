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
}
