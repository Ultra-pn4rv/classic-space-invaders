import EnemyController from "./EnemyController.js";
import BulletController from "./BulletController.js";
import Player from "./player.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src ="./src/assets/images/space.png";

const enemyBulletController = new BulletController(canvas, 4, "red", false);
const playerBulletController = new Player(canvas, 10, "white", true);
const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
);

const player = new Player(canvas, 10, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function checkGameOver() {
    if(isGmaeOver) {
        return;
    }
    if(enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000 / 60);