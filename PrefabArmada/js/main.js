var game = new Phaser.Game(960, 540, Phaser.AUTO, "", { preload: preload, create: create, update: update });

function preload() {
  game.load.image("teacher", "assets/img/deepfried.png");
  game.load.image("background", "assets/img/oakes.png");
}

function create() {
  // Build a classroom for the teacher - Oakes will do
  game.add.sprite(0, 0, "background");

  // Begin physics, we'll need it
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Put the teachers in the classroom - maybe 50 will be enough to keep all the ragamuffins in line
  addArmadaSprites(50, "teacher");
}

function update() {
  // Today's Update Schedule: nothing
}

function addArmadaSprites(passedQuantity, passedKey) {
  for (var count = 0; count < passedQuantity; count += 1) {
    var instance = new ArmadaSprite(passedKey);
  }
}
