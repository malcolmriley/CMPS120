// Babby's First Phaser Game
// Created by Malcolm Riley
// Follows tutorial at https://phaser.io/tutorials/making-your-first-phaser-game/index
// Created for CMPS 120 Spring 2018

var game = new Phaser.Game(300, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var score = 0;
var scoreText;
var directionFacing = 1;

function preload() {
	// Load image assets
	game.load.image('sky', 'assets/img/sky.png');
	game.load.image('ground', 'assets/img/platform.png');
	game.load.image('ledge', 'assets/img/ledge.png'); // New ledge sprite
	game.load.image('star', 'assets/img/star.png');
	game.load.spritesheet('player', 'assets/img/baddie.png', 32, 32);
	game.load.image('diamond', 'assets/img/diamond.png');

	// Initialize keyboard input
	cursors = game.input.keyboard.createCursorKeys();
}

function create() {
	// Launch Phaser Physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// Add backdrop sprite
	game.add.sprite(0, 0, 'sky');

	// Initialize new group for platforms
	platforms = game.add.group();
	platforms.enableBody = true;

	// Create and configure ground object
	var ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	// Create and configure ground object
	var floor = platforms.create(400, 400, 'ground');
	floor.body.immovable = true;

	// Create and configure platforms
	ledge = platforms.create(0, 100, 'ledge'); // Platform 1
	ledge.body.immovable = true;

	ledge = platforms.create(236, 200, 'ledge'); // Platform 2
	ledge.body.immovable = true;

	ledge = platforms.create(0, 300, 'ledge'); // Platform 3
	ledge.body.immovable = true;

	ledge = platforms.create(236, 400, 'ledge'); // Platform 4
	ledge.body.immovable = true;

	ledge = platforms.create(0, 500, 'ledge'); // Platform 5
	ledge.body.immovable = true;

	// Create and configure player object
	player = game.add.sprite(32, game.world.height - 150, 'player');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 375;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1], 10, true);
	player.animations.add('right', [2, 3], 10, true);

	// Throw stars everywhere
	stars = game.add.group();
	stars.enableBody = true;
	for (var iterator = 0; iterator < 12; iterator++) {
		var star = stars.create(iterator * 30, game.rnd.integerInRange(0, 500), 'star');
		star.body.gravity.y = 60;
		star.body.bounce.y = Math.random() * 0.8; // Randomize bounce value per star instance as per tutorial
	}

	// Add diamond
	diamonds = game.add.group();
	diamonds.enableBody = true;
	// Spawn diamond on either left or right side of screen, somewhere between 0 and 500 pixels. Result is that diamond lands on one of the platforms.
	var diamond = diamonds.create(game.rnd.integerInRange(0, 1) * (300 - 32), game.rnd.integerInRange(0, 500), 'diamond');
	diamond.body.gravity.y = 800;

	// Create score text object
	scoreText = game.add.text(8, 8, 'SCORE: 0', { fontSize: '32px', fill: '#000' });
}

function update() {

	// Collision Updates
	var hitPlatform = game.physics.arcade.collide(player, platforms); // Player and platforms
	game.physics.arcade.collide(stars, platforms); // Stars and platforms
	game.physics.arcade.collide(diamonds, platforms); // Diamonds and platforms
	game.physics.arcade.overlap(player, stars, collectStar, null, this); // Stars and player
	game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this); // Diamonds and player

	// Handle player movement
	player.body.velocity.x = 0

	// If left key is pressed, add -x velocity to player sprite and play leftward animation
	if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		if (hitPlatform) {
			player.animations.play('left');
		}
		else {
			player.frame = 0;
		}
		directionFacing = 1;
	}

	// If right key is pressed, add +x velocity to player sprite and play rightward animation
	else if (cursors.right.isDown) {
		player.body.velocity.x = 150;
		if (hitPlatform) {
			player.animations.play('right');
		}
		else {
			player.frame = 3;
		}
		directionFacing = 2;
	}
	
	// Otherwise, halt animations
	else {
		player.animations.stop();
		player.frame = directionFacing;
	}

	// If up key is pressed, attempt to jump
	if (cursors.up.isDown) {
		// Check whether player sprite has collided with platform appropriately, if so, add -y velocity to player sprite (jump)
		if (player.body.touching.down && hitPlatform) {
        		player.body.velocity.y = -350;
		}
	}

	// YOU WIN
	if (score >= 125) {
		winText = game.add.text(8, 300, 'A WINNER\n IS YOU', { fontSize: '50px', fill: '#FFF' });
	}
}

function collectDiamond(player, diamond) {
	collectObject(player, diamond, 25);
}

function collectStar(player, star) {
	collectObject(player, star, 10);
}

function collectObject(player, object, scoreValue) {
	object.kill();
	score += scoreValue;
	scoreText.text = 'SCORE: ' + score;
}