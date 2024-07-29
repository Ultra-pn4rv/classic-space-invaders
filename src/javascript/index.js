import EnemyController from "./EnemyController.js";
import BulletController from "./BulletController.js";
import Player from "./Player.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const title = document.getElementById("title");
const logoSenac = document.getElementById("logoSenac");
const logoSesc = document.getElementById("logoSesc");
const instructions = document.getElementById("instructions");
const winScreen = document.getElementById("winScreen");
const score = document.getElementById("score");
const playButton = document.getElementById("playButton");

canvas.width = 1024;
canvas.height = 600;

const background = new Image();
background.src = "./src/assets/images/space.png";

const playerBulletController = new BulletController(canvas, 10, "black", true);
const enemyBulletController = new BulletController(canvas, 4, "red", true);

const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);

const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  canvas.style.display = "none";
  winScreen.style.display = "none";
  title.style.display = "none";
  score.style.display = "none";
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();

  if(!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function checkGameOver() {
  if(isGameOver) {
    return;
  }

  if(enemyBulletController.collideWith(player)){
    isGameOver = true;
  }

  if(enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if(enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

function displayGameOver() {
  if(isGameOver) {
    let text = didWin ? "Você Ganhou!" : "Game Over";
    let textOffset = didWin ? 5 : 3.6;
    ctx.fillStyle = "black";
    ctx.font = "35px 'Press Start 2P'";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

// Função para iniciar o jogo
function startGame() {
  instructions.style.display = "none";
  logoSenac.style.display = "none";
  logoSesc.style.display = "none";
  title.style.display = "flex";

  canvas.style.display = "block";
  setInterval(game, 1000 / 60);
}

playButton.addEventListener("click", startGame);