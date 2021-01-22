const width = 20;
const height = 29;

class Game {
  constructor() {
    this.field = "";
  }
  play() {
    var field = "";
    for (var y = 0; y < width; y++) {
      for (var x = 0; x < height; x++) {
        if (y == 10 && x == 15) {
          field += " x ";
        } else {
          field += " . ";
        }
      }
      field += "<br />";
    }
    this.field = field;
    document.getElementById("loop").innerHTML = map.getField();
  }

  updateField(player, thief, candy) {
    var randomX = Math.floor(Math.random() * 19);
    var randomY = Math.floor(Math.random() * 28);
    var field = "";
    for (var y = 0; y < width; y++) {
      for (var x = 0; x < height; x++) {
        //pelaaja kerää o kirjaimen
        if (candy.getY() == player.getY() && candy.getX() == player.getX()) {
          player.setScore();
          candy.setX(randomY);
          candy.setY(randomX);
        }
        // candy,thief, pelaaja ja tyhjän sijoitus
        if (candy.getY() == y && candy.getX() == x) {
          field += " o ";
        } else if (thief.getY() == y && thief.getX() == x) {
          field += "r";
        } else if (player.getY() == y && player.getX() == x) {
          field += "x";
        } else {
          field += " . ";
        }
      }
      field += "<br />";
    }
    // jos x osuu pelaajaan peli loppuu
    if (thief.getX() == player.getX() && thief.getY() == player.getY()) {
      alert("Game over!\nYour Scores: " + player.getScore());
      play();
    } else {
      this.field = field;
    }
  }
  getField() {
    return this.field;
  }
}

class Player {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.score = 0;
  }
  //Pelaajan liikutus. Palauttaa falsen jos osuu seinään, jolloin rosvo ei liiku.
  move(x, y) {
    this.posX += x;
    this.posY += y;
    var bool = true;
    if (this.posY < 0) {
      this.posY = 0;
      // console.log(`Player movement: didnt move`);
      bool = false;
    }
    if (this.posX < 0) {
      this.posX = 0;
      // console.log(`Player movement: didnt move`);
      bool = false;
    }
    if (this.posY > width - 1) {
      this.posY = width - 1;
      // console.log(`Player movement: didnt move`);
      bool = false;
    }
    if (this.posX > height - 1) {
      this.posX = height - 1;
      // console.log(`Player movement: didnt move`);
      bool = false;
    }

    //console.log(`Player movement: x:${this.posX}, y:${this.posY}`);
    return bool;
  }
  getX() {
    return this.posX;
  }
  getY() {
    return this.posY;
  }
  setX(x) {
    this.posX = x;
  }
  setY(y) {
    this.posY = y;
  }
  setScore() {
    this.score += 1;
  }
  getScore() {
    return this.score;
  }
  start() {
    this.posX = 15;
    this.posY = 10;
  }
}

class Mob {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }
  // X liikkuu aina pelaajan suuntaan, joten paramentiksi Player-olio.
  move(player) {
    var x = player.getX();
    var y = player.getY();
    var move = Math.round(Math.random() * 2);
    console.log(`arpa ${move}`);
    if (this.posX <= x && player.getY() > this.posY) {
      if (move == 1) {
        this.posY += 1;
      } else {
        this.posX += 1;
      }
    } else if (this.posX <= x && y < this.posY) {
      if (move == 1) {
        this.posY -= 1;
      } else {
        this.posX += 1;
      }
    } else if (this.posX >= x && y > this.posY) {
      if (move == 1) {
        this.posY += 1;
      } else {
        this.posX -= 1;
      }
    } else if (this.posX >= x && y < this.posY) {
      if (move == 1) {
        this.posY -= 1;
      } else {
        this.posX -= 1;
      }
    } else if (this.posY <= y && x > this.posX) {
      if (move == 1) {
        this.posX += 1;
      } else {
        this.posY += 1;
      }
    } else if (this.posY <= y && x < this.posX) {
      if (move == 1) {
        this.posX -= 1;
      } else {
        this.posY += 1;
      }
    } else if (this.posY >= y && x > this.posX) {
      if (move == 1) {
        this.posX += 1;
      } else {
        this.posY -= 1;
      }
    } else if (this.posY >= y && x < this.posX) {
      if (move == 1) {
        this.posX -= 1;
      } else {
        this.posY -= 1;
      }
    }
  }
  getX() {
    return this.posX;
  }
  getY() {
    return this.posY;
  }
  start() {
    this.posX = Math.floor(Math.random() * 16);
    this.posY = Math.floor(Math.random() * 25);
  }
}

var map = new Game();
var player = new Player(15, 10);
var thief = new Mob(
  Math.floor(Math.random() * 15),
  Math.floor(Math.random() * 10)
);
var candy = new Player(
  Math.floor(Math.random() * 15),
  Math.floor(Math.random() * 10)
);

function play() {
  player.start();
  map.play();
}

//nuolinäppäimet
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    player.move(0, -1) ? thief.move(player) : null;
  }
  if (event.key === "ArrowDown") {
    player.move(0, 1) ? thief.move(player) : null;
  }
  if (event.key === "ArrowLeft") {
    player.move(-1, 0) ? thief.move(player) : null;
  }
  if (event.key === "ArrowRight") {
    player.move(1, 0) ? thief.move(player) : null;
  }
  map.updateField(player, thief, candy);
  document.getElementById("loop").innerHTML = map.getField();
  document.getElementById("scores").innerHTML = "Scores: " + player.getScore();
});
