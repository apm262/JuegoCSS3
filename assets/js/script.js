//Lienzo con fondo y cuadrado verde se mueve solo por el

var lienzo = null,
  canvas = null;
//var player = new Rectangle(40, 40, 10, 10, "#0f0");
var body = [];
var food = new Rectangle(80, 80, 10, 10, "#f00");

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_P = 80;
const KEY_ENTER = 13;

const ARRIBA = 0;
const DERECHA = 1;
const ABAJO = 2;
const IZQUIERDA = 3;

var dir = DERECHA;

var lastPress = null;

var pause = true;

var score = 0;

var gameover = false;
var wall = [];
wall.push(new Rectangle(100, 50, 10, 10, "#999"));
wall.push(new Rectangle(100, 100, 10, 10, "#999"));
wall.push(new Rectangle(200, 50, 10, 10, "#999"));
wall.push(new Rectangle(200, 100, 10, 10, "#999"));
function Rectangle(x, y, width, height, color) {
  this.x = x == null ? 0 : x;
  this.y = y == null ? 0 : y;
  this.width = width == null ? 0 : width;
  this.height = height == null ? this.width : height;
  this.color = color == null ? "#000" : color;
}
Rectangle.prototype.intersects = function (rect) {
  if (rect != null) {
    return (
      this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y
    );
  }
};
Rectangle.prototype.fill = function (lienzo) {
  if (lienzo != null) {
    lienzo.fillStyle = this.color;
    lienzo.fillRect(this.x, this.y, this.width, this.height);
  }
};

body.push(new Rectangle(40, 40, 10, 10, "#0f0"));
body.push(new Rectangle(0, 0, 10, 10, "#0f0"));
body.push(new Rectangle(0, 0, 10, 10, "#0f0"));
function iniciar() {
  canvas = document.getElementById("lienzo");
  lienzo = canvas.getContext("2d");
  run();
  repaint();
}
function run() {
  setTimeout(run, 50);
  act();
}
function repaint() {
  requestAnimationFrame(repaint);
  paint(lienzo);
}
function random(max) {
  return Math.floor(Math.random() * max);
}
function reset() {
  score = 0;
  dir = DERECHA;
  body[0].x = 40;
  body[0].y = 40;
  food.x = random(canvas.width / 10 - 1) * 10;
  food.y = random(canvas.height / 10 - 1) * 10;
  lastPress = null;
  gameover = false;
  body.length = 0;
  body.push(new Rectangle(40, 40, 10, 10, "#0f0"));
  body.push(new Rectangle(0, 0, 10, 10, "#0f0"));
  body.push(new Rectangle(0, 0, 10, 10, "#0f0"));
}

function act() {
  if (!pause && !gameover) {
    if (lastPress == KEY_UP && dir != ABAJO) dir = ARRIBA;
    if (lastPress == KEY_RIGHT && dir != IZQUIERDA) dir = DERECHA;
    if (lastPress == KEY_DOWN && dir != ARRIBA) dir = ABAJO;
    if (lastPress == KEY_LEFT && dir != DERECHA) dir = IZQUIERDA;
    console.log(body);
    if (dir == DERECHA) body[0].x +=10;
    if (dir == IZQUIERDA) body[0].x -=10;
    if (dir == ARRIBA) body[0].y -= 10;
    if (dir == ABAJO) body[0].y += 10;

    if (body[0].x >= canvas.width) body[0].x = 0;
    if (body[0].y >= canvas.height) body[0].y = 0;
    if (body[0].x < 0) body[0].x = canvas.width - 5;
    if (body[0].y < 0) body[0].y = canvas.height - 5;

    for (var i = body.length - 1; i > 0; i--) {
      body[i].x = body[i - 1].x;
      body[i].y = body[i - 1].y;
    }
    for (var i = 2; i < body.length; i++) {
      if (body[0].intersects(body[i])) {
        gameover = true;
      }
    }

    for (var i = 0; i < wall.length; i++) {
      if (food.intersects(wall[i])) {
        food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 - 1) * 10;
      }
      if (body[0].intersects(wall[i])) {
        gameover = true;
      }
    }
    if (gameover || lastPress == KEY_ENTER) {
      reset();
    }
    if (body[0].intersects(food)) {
      score++;
      food.x = random(canvas.width / 10 - 1) * 10;
      food.y = random(canvas.height / 10 - 1) * 10;
      body.push(new Rectangle(0,0,10,10, "#0f0"));
    }
  }
  if (lastPress == KEY_P) {
    pause = !pause;
    lastPress = null;
  }
}

function paint(lienzo) {
  lienzo.fillText("Last Press: " + lastPress, 10, 30);
  lienzo.fillText("Score: " + score, 10, 40);

  var gradiente = lienzo.createLinearGradient(0, 0, 0, canvas.height);

  gradiente.addColorStop(0.5, "#0000FF");
  gradiente.addColorStop(1, "#000000");
  lienzo.fillStyle = gradiente;
  lienzo.fillRect(0, 0, canvas.width, canvas.height);
  lienzo.fillStyle = "#0f0";
  //body[0].fill(lienzo);
  //lienzo.fillRect(x,y,10,10);
  for (var i = 0; i < body.length; i++) {
    body[i].fill(lienzo);
  }

  food.fill(lienzo);
  lienzo.fillText("Score: " + score, 10, 40);
  for (var i = 0, l = wall.length; i < l; i++) {
    wall[i].fill(lienzo);
  }

  if (pause) {
    lienzo.textAlign = "center";
    lienzo.font = '20px "Vast Shadow"';
    lienzo.fillText("PAUSE", 150, 75);
    lienzo.textAlign = "left";
  }
  if (gameover) {
    if (gameover) lienzo.fillText("GAME OVER", 150, 75);
    else lienzo.fillText("PAUSE", 150, 75);
  }
}



window.addEventListener("load", iniciar, false);

document.addEventListener(
  "keydown",
  function (evt) {
    lastPress = evt.keyCode;
  },
  false
);
