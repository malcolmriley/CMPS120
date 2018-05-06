var STATE_RUN = {

  preload: function() {
    // Create Audio
    music_run = game.add.audio("song_run");
    music_run.loop = true;
    fx_scribble = game.add.audio("fx_scribble");
  },

  create: function() {
    // Play Music
    music_run.play();

    // Launch Phaser Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Initialize Terrain
    terrain = game.add.tileSprite(0, 470, 2400, 131, "textures", "terrain");
    game.physics.arcade.enable(terrain);
    terrain.body.immovable = true;
    terrain.body.setSize(terrain.width, 50, 0, 100)
    terrain.scale.setTo(0.5, 0.5);

    // Initialize groups
    decorations = game.add.group();
    scribbles = game.add.group();
    scribbles.enableBody = true;

    // Initialize Player
    player = game.add.sprite(20, 320, "textures", "player_run_0");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 1600;
    player.body.collideWorldBounds = true;
    player.body.setSize(175, 350, 225, 50);
    player.scale.setTo(0.5, 0.5);
    player.animations.add("player_run", Phaser.Animation.generateFrameNames("player_run_", 0, 12), 10, true);
    player.animations.play("player_run");

    // Initialize Hand
    hand = game.add.sprite(1250, 200, "textures", "hand");
    hand.scale.setTo(0.3, 0.3);

    // Initialize UI
    score = 0;
    ui_score = game.add.sprite(10, 10, "textures", "ui_text_score");
    ui_score.scale.setTo(0.5, 0.5);
    ui_score_text = game.add.text(310, 10, '0', { fontSize: '50px', fill: '#000' })

    // Spawn directions
    let directions = decorations.create(1250, 128, "textures", "ui_directions");
    directions.scale.setTo(0.35, 0.35);

    // Initialize Controls
    input_spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    input_spacebar.onDown.add(jump, this);

    scribbleProgress = 650;
    difficultyFactor = 1;
  },

  update: function() {
    // Update terrain
    terrain.tilePosition.x -= 10;
    spawnDecorator();

    // update individual decorators
    decorations.forEach(updateDecorator, this);
    scribbles.forEach(updateScribble, this);

    // Update score and difficulty factor
    score += 1;
    ui_score_text.text = score;
    difficultyFactor = game.math.clamp(score / 300, 1, 200);

    // Make the hand do stuff
    updateHand(this);

    // Check Physics
    var hitScribble = game.physics.arcade.overlap(player, scribbles);
    var hitTerrain = game.physics.arcade.collide(player, terrain);
    if (hitScribble) {
      game.state.start("state_lose");
    }
  },

  shutdown: function() {
    fx_scribble.stop();
    music_run.stop();
  }
}

function jump() {
  if (player.y > 250) {
    player.body.velocity.y = -800;
  }
}

function updateHand(passedPointer) {
  scribbleProgress += difficultyFactor;
  if (scribbleProgress >= 1000) {
    scribbleProgress = 0;
    let random = Math.random();
    if (random < 0.5) {
      let tween_down = game.add.tween(hand).to({ x: 800, y: 175 }, 1000 - difficultyFactor, Phaser.Easing.Bounce.Out, true)
      tween_down.onComplete.add(spawnScribbleLow, passedPointer);
    }
    else {
      let tween_up = game.add.tween(hand).to({ x: 800, y: 0 }, 1000 - difficultyFactor, Phaser.Easing.Bounce.Out, true)
      tween_up.onComplete.add(spawnScribbleHigh, passedPointer);
    }
  }
}

function spawnScribbleHigh() {
  spawnScribble(200);
}

function spawnScribbleLow() {
  spawnScribble(425);
}

// High: 200, Low: 450
function spawnScribble(passedHeight) {
  let newScribble = scribbles.create(850, passedHeight, "textures", "scribble1");
  newScribble.body.setSize(300, 300, 100, 100);
  newScribble.scale.setTo(0.15, 0.15);
  newScribble.animations.add("scribble_anim", Phaser.Animation.generateFrameNames("scribble", 1, 4), 10, true);
  newScribble.animations.play("scribble_anim");
  fx_scribble.play();
}

function spawnDecorator() {
  //TODO: Fix floating rocks
  if (Math.random() < 0.08) {
    let name = "grass";
    if (game.rnd.integerInRange(0, 9) == 0) {
      name = "rock";
    }
    let decor = decorations.create(1250, 480 + game.rnd.integerInRange(-20, 60), "textures", name + game.rnd.integerInRange(1, 3));
    decor.checkWorldBounds = true;
    decor.scale.setTo(0.5, 0.5);
  }
}

function updateScribble(passedSprite) {
  updateDecorator(passedSprite);

}

function updateDecorator(passedSprite) {
  passedSprite.position.x -= 5;
  if (passedSprite.position.x < (-1 * passedSprite.width)) {
    passedSprite.destroy();
  }
}
