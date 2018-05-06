var STATE_LOSE = {

  preload: function() {
    // Display Backdrop
    let backdrop = game.add.sprite(0, 0, "textures", "backdrop");
    backdrop.scale.setTo(0.6, 0.6);

    // Create audio
    fx_click = game.add.audio("fx_click");
    fx_crumple = game.add.audio("fx_crumple");

    // Add UI elements
    buttons = game.add.group();

    let dialog = game.add.sprite(100, 30, "textures", "ui_lose");
    dialog.scale.setTo(0.4, 0.4);

    let button_retry = buttons.create(380, 438, "textures", "ui_button_retry");
    setupButton(button_retry, gotoGame, this);

    let button_main = buttons.create(830, 436, "textures", "ui_button_main");
    setupButton(button_main, gotoMenu, this);
  },

  create: function() {
    fx_crumple.play();
  },

  update: function() {

  },

  shutdown: function() {
    fx_crumple.stop();
  },

}

function gotoMenu() {
  fx_click.play();
  game.state.start("state_menu");
}

function gotoGame() {
  fx_click.play();
  game.state.start("state_run");
}
