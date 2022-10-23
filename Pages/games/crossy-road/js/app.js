const yCoordinates = [53, 136, 219];
const speedArray = [1, 100, 500];
const randomNums = [1, 2.5, 5];

// Enemies our player must avoid
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = yCoordinates[Math.floor(Math.random() * yCoordinates.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // multiplies the movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < 494) {
    this.x =
      this.x +
      randomNums[Math.floor(Math.random() * randomNums.length)] +
      speedArray[Math.floor(Math.random() * speedArray.length)] * dt;
  } else {
    this.x = -80;
    this.y = yCoordinates[Math.floor(Math.random() * yCoordinates.length)];
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.sprite = 'images/char-pink-girl.png';
  this.x = 202;
  this.y = 385;
};

//this function keeps checking if there are any collisions
//between player and enemies by calling checkForCollisions function
Player.prototype.update = function(dt) {
  checkForCollisions();
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handles the input of user depending on the arrow keys pressed and moves the player accordingly
Player.prototype.handleInput = function(keyPressed) {
  switch (keyPressed) {
    case 'up':
      if (this.y > -30) {
        this.y = this.y - 83;
      }
      break;
    case 'down':
      if (this.y < 385) {
        this.y = this.y + 83;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x = this.x - 101;
      }
      break;

    case 'right':
      if (this.x < 404) {
        this.x = this.x + 101;
      }
  }
};

//Initializing all Enemy instances
const allEnemies = [];
const initiateEnemies = () => {
  for (i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
  }
};

initiateEnemies();

//creates new Player instance
const player = new Player();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//This function checks for collisions by comparing the enemy and player's co-ordinates.
//If any enemy collides with player, the player will be sent back to his initial position.
function checkForCollisions() {
  allEnemies.forEach(function(enemy) {
    if (
      enemy.x > player.x - 50 &&
      enemy.x < player.x + 50 &&
      enemy.y === player.y
    ) {
      player.x = 202;
      player.y = 385;
    }
  });
}
