/* Game implementation
 *   - player starts at the block [3, 6]
 *   - player moves one block a time, any direction, but unable to go outside
 *   - won when reach the water
 *   - collide with an enemy -> move back to the start square
 *   - enemies move in varying speeds on the paved blocks
 */

// Enemies our player must avoid
var Enemy = function(x, y, speed, game_context) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

	// The postion of the enemy
	this.x = x;
	this.y = y;
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	
	// The speed of an enemy
	this.speed = speed;
	
	// Game context
	this.gc = game_context;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += dt * this.speed;
	
	// The enemy turns back to start race when going out of screen
	// The speed is changed
	if (this.x > this.gc.NO_OF_COLS * this.gc.BLOCK_WIDTH) 
		this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
	this.speed = Math.random()*300 + 50;
	this.x = -(Math.random()*100) - this.gc.BLOCK_WIDTH;
	this.y = (Math.floor(Math.random()*3)+1)*this.gc.BLOCK_HEIGHT;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, game_context){
	// position of the player
	this.x = x;
	this.y = y;
	
	this.sprite = 'images/char-boy.png';
	
	this.gc = game_context;
};

Player.prototype.update = function() {
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
	switch(key) {
		case this.gc.KEY_LEFT:
			if (this.x - this.gc.BLOCK_WIDTH >= 0)	// prevent go out the left
				this.x -= this.gc.BLOCK_WIDTH;
			break;
		case this.gc.KEY_RIGHT:
			if (this.x + this.gc.BLOCK_WIDTH < this.gc.NO_OF_COLS * this.gc.BLOCK_WIDTH)	// prevent go out the right
				this.x += this.gc.BLOCK_WIDTH;
			break;
		case this.gc.KEY_UP:
			if (this.y - this.gc.BLOCK_HEIGHT >= 0)	// prevent go out the top
				this.y -= this.gc.BLOCK_HEIGHT;
		
			// check if player wins
			if (this.y == 0)
				setTimeout(_ => {this.gc.congratulation();}, 100);
			break;
		case this.gc.KEY_DOWN:
			if (this.y + this.gc.BLOCK_HEIGHT < this.gc.NO_OF_ROWS * this.gc.BLOCK_HEIGHT)	// prevent go out the bottom
				this.y += this.gc.BLOCK_HEIGHT;
	}	
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
class Game {
	constructor() {
		// Define constants
		this.KEY_LEFT = 'left';
		this.KEY_RIGHT = 'right';
		this.KEY_UP = 'up';
		this.KEY_DOWN = 'down';

		this.BLOCK_WIDTH = 101;
		this.BLOCK_HEIGHT = 83;
		this.PLAYER_START_X = 2 * this.BLOCK_WIDTH; 
		this.PLAYER_START_Y = 5 * this.BLOCK_HEIGHT;

		this.NO_OF_ROWS = 6;
		this.NO_OF_COLS = 5;
		
		// Define properties
		this.win_times = 0;
		this.die_times = 0;
		this.allEnemies = [];
		this.player = new Player(this.PLAYER_START_X, this.PLAYER_START_Y, this);
		
		// Init composition objects
		this.initialize();
	}
	

	initialize() {
		// init enemies
		var enemy1 = new Enemy(0, 0, 0, this);
		enemy1.reset();
		var enemy2 = new Enemy(0, 0, 0, this);
		enemy2.reset();
		var enemy3 = new Enemy(0, 0, 0, this);
		enemy3.reset();
		this.allEnemies.push(enemy1);
		this.allEnemies.push(enemy2);
		this.allEnemies.push(enemy3);
	}
	
	reset() {
		this.resetPlayer();
	}
	
	resetPlayer() {
		this.player.x = this.PLAYER_START_X;
		this.player.y = this.PLAYER_START_Y;
	}
	
	play() {
		//var player = this.player;	// closure variable
		
		// This listens for key presses and sends the keys to your
		// Player.handleInput() method. You don't need to modify this.
		document.addEventListener('keyup', e => {	// use arrow function to make 'this' works
			var allowedKeys = {
				37: this.KEY_LEFT,
				38: this.KEY_UP,
				39: this.KEY_RIGHT,
				40: this.KEY_DOWN
			};

			this.player.handleInput(allowedKeys[e.keyCode]);
		});
	}
	
	gotCollided() {
		this.die_times++;
		
		this.reset();
		this.updatePoints();
	}
	
	congratulation() {
		this.win_times++;
		
		this.reset();
		this.updatePoints();
	}
	
	updatePoints() {
		document.getElementById("win").innerText = this.win_times;
		document.getElementById("die").innerText = this.die_times;
	}
}

var game = new Game();
game.play();