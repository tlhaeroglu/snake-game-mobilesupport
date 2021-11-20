var canvas = document.getElementById("canvas");
var ctx;

var intervalTime = 110;

var up = document.getElementById("up");
var down = document.getElementById("down");
var right = document.getElementById("right");
var left = document.getElementById("left");

var img = document.getElementById("img");
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");

var score = 0;

var fullScreen = document.querySelector(".btn-primary");

var scoreText = document.getElementById("score");
var gameOverFrame = document.querySelector(".game-over");
gameOverFrame.style.display = "none";
var gameOverScoreText = document.querySelector(".h6");
var gameOverButton = document.querySelector(".btn-danger");

var part = 20;

var x = part;
var y = 0;
var numberX = 100;

var snake = [
  [numberX, 180],
  [numberX + part, 180],
  [numberX + part * 2, 180],
  [numberX + part * 3, 180],
  [numberX + part * 4, 180],
  [numberX + part * 5, 180],
];

var foodX = 0,
  foodY = 0;

function setSettings() {
  var wW = window.innerWidth;
  var wH = window.innerHeight;

  let mW;
  if (part === 10) {
    mW = wW - (wW % 10);
  } else {
    for (let i = wW; i > wW - 20; i--) {
      if (i % 5 === 0 && i % 4 === 0) {
        mW = i;
        break;
      }
    }
  }
  canvas.width = mW - part * 2;

  let mH;
  if (part === 10) {
    mH = wH - (wH % 10);
  } else {
    for (let i = wH; i > wH - 20; i--) {
      if (i % 5 === 0 && i % 4 === 0) {
        mH = i;
        break;
      }
    }
  }
  canvas.height = mH - part * 9;
}

function getWidth() {
  return canvas.width;
}

function getHeigth() {
  return canvas.height;
}

function init() {
  ctx = canvas.getContext("2d");
  setSettings();
  addFood();
  drawSnake();
}

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = "red";
  for (let i = 0; i < snake.length - 1; i++) {
    ctx.drawImage(img, snake[i][0], snake[i][1], part, part);
  }
  ctx.drawImage(
    img2,
    snake[snake.length - 1][0],
    snake[snake.length - 1][1],
    part,
    part
  );
}

function moveSnake() {
  let control = true;
  //console.log("giriş ", snake);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img1, foodX, foodY, part, part);
  ctx.beginPath();

  var i = snake.length - 1;

  if (snake[i][0] === canvas.width) {
    snake[i][0] = 0;
  }
  if (snake[i][0] === 0 && x === -1 * part) {
    snake[i][0] = canvas.width;
  }
  if (snake[i][1] === canvas.height) {
    snake[i][1] = 0;
  }
  if (snake[i][1] === 0 && y === -1 * part) {
    snake[i][1] = canvas.height;
  }
  if (snake[i][0] == foodX && snake[i][1] == foodY) {
    addFood();
    score++;
    scoreText.innerHTML = "Score : " + score;
    control = false;
  }

  addX = snake[i][0] + x;
  addY = snake[i][1] + y;
  snake.push([addX, addY]);
  if (control) {
    snake.shift();
  }
  //console.log("çıkış ", snake);
  for (let a = 0; a < snake.length; a++) {
    for (let b = 0; b < snake.length; b++) {
      if (!(a === b)) {
        if (snake[a][0] === snake[b][0] && snake[a][1] === snake[b][1]) {
          gameOverFrame.style.display = "block";
          gameOverScoreText.innerHTML = scoreText.innerHTML;
          clearInterval(interval);
          newSnake();
        }
      } else {
        b++;
      }
    }
  }
  drawSnake();
  canvas.focus();
}

function addFood() {
  foodX = Math.floor(Math.random() * (getWidth() / part - 1)) * part;
  foodY = Math.floor(Math.random() * (getHeigth() / part - 1)) * part;
  if (foodX === 0 || foodY === 0) addFood();
  snake.forEach((e) => {
    if (e[0] === foodX && e[1] === foodY) {
      addFood();
    }
  });
  ctx.beginPath();
}

function newGame() {
  score = 0;
  scoreText.innerHTML = "Score : " + score;
  gameOverFrame.style.display = "none";
  x = part;
  y = 0;
  interval = setInterval(moveSnake, intervalTime);
}

function newSnake() {
  snake = [
    [numberX, 180],
    [numberX + part, 180],
    [numberX + part * 2, 180],
    [numberX + part * 3, 180],
    [numberX + part * 4, 180],
  ];
}

function UP() {
  if (!(x === 0 && y === part)) {
    x = 0;
    y = -1 * part;
  }
}

function DOWN() {
  if (!(x === 0 && y === -1 * part)) {
    x = 0;
    y = part;
  }
}

function RIGHT() {
  if (!(x === -1 * part && y === 0)) {
    x = part;
    y = 0;
  }
}

function LEFT() {
  if (!(x === part && y === 0)) {
    x = -1 * part;
    y = 0;
  }
}

up.addEventListener("click", function () {
  UP();
});

down.addEventListener("click", function () {
  DOWN();
});

right.addEventListener("click", function () {
  RIGHT();
});

left.addEventListener("click", function () {
  LEFT();
});

canvas.addEventListener(
  "keydown",
  (event) => {
    var e = event.key.toLowerCase();
    if (e === "w" || e === "arrowup") {
      UP();
    }
    if (e === "s" || e === "arrowdown") {
      DOWN();
    }
    if (e === "d" || e === "arrowright") {
      RIGHT();
    }
    if (e === "a" || e === "arrowleft") {
      LEFT();
    }
  },
  false
);

gameOverButton.addEventListener("click", newGame);

document.addEventListener("DOMContentLoaded", init);

var interval = setInterval(moveSnake, intervalTime);

fullScreen.addEventListener("click", openFullscreen);

function openFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    /* Safari */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    /* IE11 */
    canvas.msRequestFullscreen();
  }
}

/*

  TOUCH LISTENER


*/

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      LEFT();
    } else {
      RIGHT();
    }
  } else {
    if (yDiff > 0) {
      UP();
    } else {
      DOWN();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}
