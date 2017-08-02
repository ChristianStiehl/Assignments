var game = new Phaser.Game(1334, 750, Phaser.CANVAS, "gameDiv");

game.state.add("boot", bootState);
game.state.add("play", playState);
game.state.start("boot");