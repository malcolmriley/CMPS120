ArmadaSprite = function(imageName) {
  // Call Sprite constructor
  Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, imageName);

  // Add [this] to existing game and physics
  game.physics.arcade.enable(this);
  game.add.existing(this);

  // Define width, height, and velocity randomly
  let scale_width = game.rnd.realInRange(0.25, 2.0);
  let scale_height = game.rnd.realInRange(0.25, 2.0);
  let velocity_x = game.rnd.between(5, 50);

  // Set Properties
  this.scale.setTo(scale_width, scale_height);
  this.body.velocity.x = (-1 * velocity_x);
};

armada_update = function() {
  // Check for reversal
  if (game.input.keyboard.justPressed(Phaser.Keyboard.R)) {
    this.body.velocity.x *= -1;
  }

  // Set wrap padding - distance "beyond" x bounds that wrapping occurs
  let wrap_padding = 10

  // Check and wrap on left side
  if (this.x < (0 - wrap_padding)) {
    this.x = game.world.width;
  }

  // Check and wrap on right side
  else if (this.x > (game.world.width + wrap_padding)) {
    this.x = 0;
  }
};

// JavaScript """""""Inheiritance""""""" boilerplate
ArmadaSprite.prototype = Object.create(Phaser.Sprite.prototype);
ArmadaSprite.prototype.constructor = ArmadaSprite;
ArmadaSprite.prototype.update = armada_update;
