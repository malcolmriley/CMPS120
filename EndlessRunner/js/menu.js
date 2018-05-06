var STATE_MENU = {

  preload: function() {
    game.stage.backgroundColor = "#FFFAC9";
    // Create Audio
    fx_click = game.add.audio("fx_click");
    music_menu = game.add.audio("song_menu");
    music_menu.loop = true;
  },

  create: function() {
    // Play Music
    music_menu.play();

    // Add title
    title = game.add.sprite(127, 30, "textures", "ui_title");
    title.scale.setTo(0.5, 0.5);

    // Create play button
    button_play = game.add.sprite(600, 480, "textures", "ui_play");
    setupButton(button_play, gotoGame, this);
  },

  update: function() {

  },

  shutdown: function() {
      music_menu.stop();
  },

  gotoGame: function() {
    fx_click.play();
    this.state.start("state_run");
  }
}
