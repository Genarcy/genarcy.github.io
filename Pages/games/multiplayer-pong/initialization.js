document.addEventListener( 'DOMContentLoaded', function() {
	var fillColor = '#333333';

	//pong canvas
	var pongCanvas = document.querySelector('#pongCanvas');
	var cxt = pongCanvas.getContext('2d');
	cxt.fillStyle = fillColor;
	cxt.width = pongCanvas.width;
	cxt.height = pongCanvas.height;

	//paddleCanvas
	var paddleCanvas = document.querySelector('#paddleCanvas');
	var paddleCxt = paddleCanvas.getContext('2d');
	paddleCxt.fillStyle = fillColor;
	paddleCxt.width = paddleCanvas.width;
	paddleCxt.height = paddleCanvas.height;

	var modal = document.querySelector('#modal');
	var leftScore = document.querySelector('#leftScore');
	var rightScore = document.querySelector('#rightScore');

	var controller = new GameController( cxt, paddleCxt, modal, leftScore, rightScore );
});

class GameController {

	constructor( ballCxt, paddleCxt, modal, leftScore, rightScore ) {
		this.modal = modal;
		this.ballCxt = ballCxt;
		this.paddleCxt = paddleCxt;
		this.leftScore = new Score(leftScore);
		this.rightScore = new Score(rightScore);

		this.regenerateBoard();

		this.initializeControls();
		this.frameCount = 0;
	}

	regenerateBoard() {
		if( this.ball )
			this.ball.okayToTrace = false;

		this.ballCxt.clearRect(0, 0, this.ballCxt.width, this.ballCxt.height);
		this.paddleCxt.clearRect(0, 0, this.paddleCxt.width, this.paddleCxt.height);

		var startingXSpeed = this.getRandomSpeed(0.5) * 1.5;
		var startingYSpeed = this.getRandomSpeed(0.25);
		this.ball = new Ball( this.ballCxt, startingXSpeed, startingYSpeed );
		this.leftPaddle = new Paddle( this.paddleCxt, 'left' );
		this.rightPaddle = new Paddle( this.paddleCxt, 'right' );

		this.ball.draw();
		this.leftPaddle.draw();
		this.rightPaddle.draw();
	}

	getRandomSpeed( lowerBound ) {
		var startingSpeed = Math.random();
		var direction = Math.round(Math.random());
		direction = (direction == 1) ? 1 : -1;
		startingSpeed = (startingSpeed < lowerBound) ? lowerBound : startingSpeed;
		return startingSpeed * direction;
	}

	initializeControls() {
		this.speedReference = {
			'38' : -2.5,
			'40' : 2.5,
			'65' : -2.5,
			'90' : 2.5
		};

		var object = this;
		document.onkeydown = function(e) {
			//right paddle
			if( e.keyCode == '38' ) {
				//up arrow
				object.paddleControlKeyPress('right', e.keyCode);
			}
			if( e.keyCode == '40' ) {
				//down arrow
				object.paddleControlKeyPress('right', e.keyCode);
			}

			//left paddle
			if( e.keyCode == '65' ) {
				//'a' key
				object.paddleControlKeyPress('left', e.keyCode);
			}
			if( e.keyCode == '90' ) {
				//'z' key
				object.paddleControlKeyPress('left', e.keyCode);
			}

			//others
			if( e.keyCode == '32' ) {
				if( object.intervalController ) {
					object.stop();
				} else {
					object.start();
				}
			}
		};
		document.onkeyup = function(e) {
			//right paddle
			if( e.keyCode == '38' ) {
				//up arrow
				object.paddleControlKeyRelease('right', e.keyCode);
			}
			if( e.keyCode == '40' ) {
				//down arrow
				object.paddleControlKeyRelease('right', e.keyCode);
			}

			//left paddle
			if( e.keyCode == '65' ) {
				//'a' key
				object.paddleControlKeyRelease('left', e.keyCode);
			}
			if( e.keyCode == '90' ) {
				//'z' key
				object.paddleControlKeyRelease('left', e.keyCode);
			}
		}
	}

	advanceFrame() {
		this.ball.moveAtSpeed();
		this.leftPaddle.moveAtSpeed();
		this.rightPaddle.moveAtSpeed();

		this.ball.handleWallDetection();
		this.handlePaddleCollision();
		this.handleScoreDetection();
	}

	start() {
		this.modal.style.display = "none";

		var object = this;
		this.intervalController = setInterval(function() {
			object.advanceFrame();
		}, 5);
	}

	stop( isScore = false ) {
		clearInterval(this.intervalController);
		this.intervalController = false;

		if( !isScore ) {
			this.modal.style.display = "block";
		}
	}

	paddleControlKeyPress(paddle, passedControl) {
		if( paddle == 'left' ) {
			if( this.leftPaddle.controlStack.indexOf( passedControl ) == -1 ) {
				this.leftPaddle.controlStack.push(passedControl);
			} else {
				this.leftPaddle.controlStack.splice( this.leftPaddle.controlStack.indexOf( passedControl ), 1);
				this.leftPaddle.controlStack.push(passedControl);
			}
			this.setPaddleSpeed('left');
		}
		if( paddle == 'right' ) {
			if( this.rightPaddle.controlStack.indexOf( passedControl ) == -1 ) {
				this.rightPaddle.controlStack.push(passedControl);
			} else {
				this.rightPaddle.controlStack.splice( this.rightPaddle.controlStack.indexOf( passedControl ), 1);
				this.rightPaddle.controlStack.push(passedControl);
			}
			this.setPaddleSpeed('right');
		}
	}

	paddleControlKeyRelease(paddle, passedControl) {
		if( paddle == 'left' ) {
			this.leftPaddle.controlStack.reverse();
			this.leftPaddle.controlStack.splice( this.leftPaddle.controlStack.indexOf( passedControl ), 1);
			this.leftPaddle.controlStack.reverse();

			if( this.leftPaddle.controlStack.length == 0 )
				this.leftPaddle.ySpeed = 0;
			else
				this.setPaddleSpeed('left');
		}
		if( paddle == 'right' ) {
			this.rightPaddle.controlStack.reverse();
			this.rightPaddle.controlStack.splice( this.rightPaddle.controlStack.indexOf( passedControl ), 1);
			this.rightPaddle.controlStack.reverse();

			if( this.rightPaddle.controlStack.length == 0 )
				this.rightPaddle.ySpeed = 0;
			else
				this.setPaddleSpeed('right');
		}
	}

	setPaddleSpeed(paddle) {
		if( paddle == 'left' ) {
			var speed = this.speedReference[ this.leftPaddle.controlStack[ this.leftPaddle.controlStack.length - 1 ] ];
			this.leftPaddle.ySpeed = speed;
		}
		if( paddle == 'right' ) {
			var speed = this.speedReference[ this.rightPaddle.controlStack[ this.rightPaddle.controlStack.length - 1 ] ];
			this.rightPaddle.ySpeed = speed;
		}
	}

	handlePaddleCollision() {
		var ballLeft = this.ball.left;
		var ballTop = this.ball.top;
		var ballRight = this.ball.left + this.ball.width;
		var ballBottom = this.ball.top + this.ball.height;

		if( this.isBallPaddleCollision( ballLeft, ballTop, 'left' ) ||
			this.isBallPaddleCollision( ballLeft, ballBottom, 'left' ) ) {
				this.reverseBallXDirection('left');
				this.ball.changeTraceColor();
		}
		if( this.isBallPaddleCollision( ballRight, ballTop, 'right' ) ||
			this.isBallPaddleCollision( ballRight, ballBottom, 'right' ) ) {
				this.reverseBallXDirection( 'right' );
				this.ball.changeTraceColor();
		}
	}

	isBallPaddleCollision( ballX, ballY, whichPaddle ) {
		var ballCoords = new Coords( ballX, ballY );
		var paddleCoords = this.getPaddleCoords( whichPaddle );

		var ballXCollision;
		if( whichPaddle == 'left' )
			ballXCollision = ( ballCoords.x <= paddleCoords.x && ballCoords.x >= this.leftPaddle.left);
		else
			ballXCollision = ( ballCoords.x >= paddleCoords.x && ballCoords.x <= this.rightPaddle.left + this.rightPaddle.width);

		if( (ballCoords.y > paddleCoords.top && ballCoords.y < paddleCoords.bottom) 
			&& ( ballXCollision ) ) {
			return true;
		} else {
			return false;
		}
	}

	getPaddleCoords( whichPaddle ) {
		var paddleCoords = {};
		if( whichPaddle == 'left' ) {
			paddleCoords = {
				top: this.leftPaddle.top,
				bottom: this.leftPaddle.top + this.leftPaddle.height,
				x: this.leftPaddle.left + this.leftPaddle.width
			};
		} else {
			paddleCoords = {
				top: this.rightPaddle.top,
				bottom: this.rightPaddle.top + this.rightPaddle.height,
				x: this.rightPaddle.left
			};
		}
		return paddleCoords;
	}

	getBounceSpeedIncrease() {
		var directionMultiplier = (this.ball.xSpeed < 0) ? 1 : -1;
		// var speedIncrease = (Math.abs(this.ball.xSpeed) >= 4) ? 0 : this.ball.paddleBounces / 10 * directionMultiplier;
		var speedIncrease = (Math.abs(this.ball.xSpeed) >= 9)  ? 0 : 0.25 * directionMultiplier;

		return speedIncrease;
	}

	reverseBallXDirection( whichPaddle ) {
		if( whichPaddle == 'left' ) 
			this.ball.left = this.leftPaddle.left + this.leftPaddle.width;
		else {
			this.ball.left = this.rightPaddle.left - this.ball.width;
		}

		this.ball.paddleBounces++;
		this.ball.xSpeed = -this.ball.xSpeed + this.getBounceSpeedIncrease();
	}

	handleScoreDetection() {
		//left wall
		if( this.ball.left <= 0 ) {
			this.stop(true);
			this.rightScore.increase();
			this.regenerateBoard();
		}

		if( this.ball.left + this.ball.width >= this.ballCxt.width ) {
			this.stop(true);
			this.leftScore.increase();
			this.regenerateBoard();
		}
	}
}

class Coords {
	constructor( x, y ) {
		this.x = x;
		this.y = y;
	}
}

class Score {
	constructor( passedDomObject ) {
		this.htmlObject = passedDomObject;
		this.current = parseInt(this.htmlObject.innerHTML);
	}

	increase() {
		this.current++;
		this.htmlObject.innerHTML = this.current;
	}
}

class MovableObject {
	constructor( cxt, width, height, left, top, initialXSpeed, initialYSpeed ) {
		this.cxt = cxt;
		this.setSize(width, height);
		this.setPosition( left, top );
		this.xSpeed = initialXSpeed;
		this.ySpeed = initialYSpeed;
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	setPosition( left, top ) {
		this.left = left;
		this.top = top;
	}

	draw() {
		this.cxt.fillStyle = '#333333';
		this.cxt.fillRect( this.left, this.top, this.width, this.height );
	}

	move( left, top ) { 
		//padded area is to eliminate ghost lines leftover from semi-transparent pixels.
		this.cxt.clearRect( this.left - 0.5, this.top - 0.5, this.width + 1, this.height + 1 ); 

		this.left = left;
		this.top = top;
		this.draw();
	}

	moveAtSpeed() {
		this.move(this.left + this.xSpeed, this.top + this.ySpeed);
	}

	reverseYSpeed() {
		this.ySpeed = -this.ySpeed;
	}
}

class Paddle extends MovableObject {
	constructor( cxt, side ) {

		var width = 6;
		var height = 80;

		super( cxt, width, height, 0, 0, 0, 0 );

		this.side = side;
		var left = this.calculateInitialLeftPosition( cxt, side, width );
		var top = this.calculateInitialTopPosition( cxt, height );

		this.setPosition( left, top );	//reset position with new calculations we can do after 'this' is initialized.
		this.controlStack = [];
	}

	calculateInitialLeftPosition( cxt, side, paddleWidth ) {
		var sideMargin = 30;

		if( side == 'left' )
			return sideMargin;
		else
			return cxt.width - paddleWidth - sideMargin;
	}

	calculateInitialTopPosition( cxt, paddleHeight ) {
		var halfCanvas = cxt.height / 2;
		var halfPaddle = paddleHeight / 2;

		return halfCanvas - halfPaddle;
	}

	moveAtSpeed() {
		var newTop = this.top + this.ySpeed;

		if( newTop <= 0 || newTop + this.height >= this.cxt.height )
			return;
		else
			super.moveAtSpeed();
	}
}

class Ball extends MovableObject {
	constructor( cxt, initialXSpeed, initialYSpeed ) {
		var size = 10;
		var left = ( cxt.width / 2 ) - ( size / 2 );
		var top = ( cxt.height / 2 ) - ( size / 2 );

		super( cxt, size, size, left, top, initialXSpeed, initialYSpeed);
		this.size = size;
		this.paddleBounces = 0;
		this.okayToTrace = true;
		this.changeTraceColor();
	}

	handleWallDetection() {
		if( this.top <= 0 ) {
			this.reverseYSpeed();
		}
		if( this.top + this.height >= this.cxt.height ) {
			this.reverseYSpeed();
		}
	}

	move(left, top) {
		var object = this;
		var currentCoords = {
			left: object.left - 0.4,
			top: object.top - 0.4,
			width: object.width + 0.8,
			height: object.height + 0.8
		};
		var timer = setTimeout(function() {
			if( object.okayToTrace ) {
				object.cxt.fillStyle = object.traceColor;
				object.cxt.fillRect( currentCoords.left, currentCoords.top, currentCoords.width, currentCoords.height );
			}
		}, 100);

		this.left = left;
		this.top = top;
		this.draw();
	}

	getRandomTraceColor() {
		var colors = ['#61C6EC', '#A7FFA4', '#F4D35E', '#EC91D8', '#D6EFFF'];
		var rand = Math.floor(Math.random() * 5);
		return colors[rand];
	}

	changeTraceColor() {
		this.traceColor = this.getRandomTraceColor();
	}
}