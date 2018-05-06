var STATE_BOOT = {

  preload: function() {
    // Set background color
    game.stage.backgroundColor = "#FFFAC9";

    // Load Sprites
    game.load.atlas("textures", "assets/atlas/spritesheet.png", "assets/atlas/sprites.json");

    // Load Audio
    game.load.audio("song_menu", "assets/audio/song_menu.wav");
    game.load.audio("song_run", "assets/audio/song_run.wav");
    game.load.audio("fx_click", "assets/audio/fx_click.wav");
    game.load.audio("fx_scribble", "assets/audio/fx_scribble.wav");
    game.load.audio("fx_crumple", "assets/audio/fx_crumple.wav");
  },

  create: function() {
    game.state.start("state_menu");
  },

  update: function() {

  },
}
