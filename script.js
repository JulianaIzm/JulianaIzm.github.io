"use strict";

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;
let gameStart;
let divButton = document.querySelector('.btn-start');
const gameAudio = new Audio('audio/play-game.mp3');
const eatAppleAudio = new Audio('audio/apple-kus.mp3');
const endGameAudio = new Audio('audio/game-over-audio.mp3');

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText('Счет: ' + score, blockSize, blockSize);
}

function gameOver() {
    clearInterval(startGame);
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over", width / 2, height / 2);
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
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(centerX, centerY, blockSize/2, 0, 2*pi, true);
        ctx.fill();
    }
    equal(otherBlock) {
        return this.col === otherBlock.col && this.row === otherBlock.row;
    }
}

class Snake {
    constructor() {
        this.parts = [
            new Block(7, 4),
            new Block(6, 4),
            new Block(5, 4)
        ];
        this.direction = "right",
        this.nextDirection = "right";
    }
    drawSnake() {
        for (let i = 0; i < this.parts.length; i++) {
            if (i === 0) {
                this.parts[i].square('#D2A5FF');
            } else if (i % 2 === 0) {
                this.parts[i].square('#ca6cfc');
            } else {
                this.parts[i].square('#8136a4')
            }
            
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
        if(this.crash(newHead)) {
            gameOver();
            gameAudio.pause();
            endGameAudio.play();
            return;
        }
        this.parts.unshift(newHead);

        if (newHead.equal(apple.position)) {
            score++;
            eatAppleAudio.play();
            apple.moveApple();
        } else {
            this.parts.pop();
        }
    }
    crash(head) {
        let left = (head.col === -1),
        top = (head.row === -1),
        right = (head.col === widthInBlocks),
        bottom = (head.row === heightInBlocks);

        let wallCrash = left || top || right || bottom;
        return wallCrash;
    }
        
    setDirection(newDirection) {
        this.nextDirection = newDirection;
    }
}

class Apple {
    constructor() {
        this.position = new Block(20, 20);
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

let serpent = new Snake();
let apple = new Apple();

let start = document.querySelector('#start'),
add;

function startGame() {
    start.remove();
    let buttonRestart = document.createElement('button');
    buttonRestart.className = "buttonRestart";
    divButton.appendChild(buttonRestart);
    buttonRestart.textContent = "Начать заново";

    buttonRestart.addEventListener('click', (e) => {
    window.location.reload();
});
    add = setInterval(function startGame() {
        gameAudio.play();
        ctx.clearRect(0, 0, width, height);
        drawScore();
        serpent.moveSnake();
        serpent.drawSnake();
        apple.drawApple();
        }, 100);
}

start.addEventListener("click", startGame);


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
