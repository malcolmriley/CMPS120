// Babby's First Endless Runner
// Created by Malcolm Riley
// Created for CMPS 120 Spring 2018
var game = new Phaser.Game(1200, 600, Phaser.AUTO, "", { preload: preload, create: create, update: update });

// Initialize States
game.state.add("state_boot", STATE_BOOT);
game.state.add("state_menu", STATE_MENU);
game.state.add("state_run", STATE_RUN);
game.state.add("state_lose", STATE_LOSE);

// Launch Boot State
game.state.start("state_boot");

function preload() {

}

function create() {

}

function update() {

}

function setupButton(passedButton, passedClickAction, passedReference) {
  passedButton.anchor.x = 0.5;
  passedButton.anchor.y = 0.5;
  passedButton.scale.setTo(0.4);
  passedButton.inputEnabled = true;
  passedButton.events.onInputDown.add(passedClickAction, passedReference);
  passedButton.events.onInputOver.add(scaleButtonBig, passedReference);
  passedButton.events.onInputOut.add(scaleButtonSmall, passedReference);
}

function scaleButtonBig(passedSprite, passedPointer) {
  passedSprite.scale.setTo(0.46, 0.46);
}

function scaleButtonSmall(passedSprite, passedPointer) {
  passedSprite.scale.setTo(0.4, 0.4);
}
