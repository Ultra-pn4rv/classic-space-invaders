import EnemyController from "./EnemyController.js";
import BulletController from "./BulletController.js";
import Player from "./Player.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const title = document.getElementById("title");
const logoSenac = document.getElementById("logoSenac");
const instructions = document.getElementById("instructions");
const playButton = document.getElementById("playButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const retryButton = document.getElementById("retryButton");
const winScreen = document.getElementById("winScreen");
const restartButton = document.getElementById("restartButton");
const footer = document.getElementById("footer");
const scoreDisplay = document.getElementById("score");
const gameOverScreenScore = document.getElementById("gameOverScreenScore");
const winScreenScore = document.getElementById("winScreenScore");

gameOverScreen.style.display = "none";
winScreen.style.display = "none";
scoreDisplay.style.display = "none";

canvas.width = 1024;
canvas.height = 600;

const background = new Image();
background.src = "./src/assets/images/space.png";

const playerBulletController = new BulletController(canvas, 10, "black", true);
const enemyBulletController = new BulletController(canvas, 4, "black", true);

let enemyController;
let player;
let playerScore = 0;

function updateScore(enemyType) {
  const scoreMap = {
    1: 50,
    2: 100,
    3: 150,
    4: 200,
    5: 250,
  };

  playerScore += scoreMap[enemyType] || 0;
  scoreDisplay.innerText = `Pontuação: ${playerScore}`;
}

let isGameOver = false;
let didWin = false;
let gameInterval;

function initGame() {
  enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController,
    updateScore
  );
  player = new Player(canvas, 3, playerBulletController);
  playerScore = 0;
  updateScore(0);
  isGameOver = false;
  didWin = false;
}

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();

  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function checkGameOver() {
  if (isGameOver) {
    clearInterval(gameInterval);
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

function displayGameOver() {
  if (isGameOver) {
    canvas.style.display = "none";
    title.style.display = "none";
    scoreDisplay.style.display = "none";

    if (didWin) {
      winScreen.style.display = "flex";
      winScreenScore.innerText = `Pontuação: ${playerScore}`;
    } else {
      gameOverScreen.style.display = "flex";
      gameOverScreenScore.innerText = `Pontuação: ${playerScore}`;
    }
  }
}

function startGame() {
  instructions.style.display = "none";
  logoSenac.style.display = "none";
  gameOverScreen.style.display = "none";
  winScreen.style.display = "none";
  title.style.display = "flex";
  scoreDisplay.style.display = "flex";
  footer.style.display = "none";

  canvas.style.display = "block";
  initGame();
  gameInterval = setInterval(game, 1000 / 60);
}

function restartGame() {
  gameOverScreen.style.display = "none";
  winScreen.style.display = "none";
  instructions.style.display = "flex";
  logoSenac.style.display = "flex";
  title.style.display = "none";
  canvas.style.display = "none";
  footer.style.display = "flex";
  scoreDisplay.style.display = "none";

  initGame();
}

playButton.addEventListener("click", startGame);
retryButton.addEventListener("click", restartGame);
restartButton.addEventListener("click", restartGame);

initGame();
