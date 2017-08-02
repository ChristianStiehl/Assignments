var bootState = {
	preload: function()
	{
		game.load.path = "assets/";

		//scenery
		game.load.image("sky", "background/sky.png");
		game.load.image("clouds", "background/clouds2.png");
		game.load.image("big_rock", "background/foliagePack_054.png");
		game.load.image("small_rock", "background/foliagePack_055.png");
		game.load.image("big_bush", "background/foliagePack_051.png");
		game.load.image("small_bush", "background/foliagePack_053.png");
		game.load.image("tree_1", "background/tree02.png");
		game.load.image("tree_2", "background/tree10.png");
		game.load.image("debris_1", "sprites/debrisWood_1.png");
		game.load.image("debris_2", "sprites/debrisWood_2.png");
		game.load.image("debris_3", "sprites/debrisWood_3.png");

		//UI
		game.load.image("arrow_empty", "UI/tank_arrowEmpty.png");
		game.load.image("arrow_full", "UI/tank_arrowFull.png");
		game.load.atlasXML("UI", "UI/sheet_white2x.png", "UI/sheet_white2x.xml");
		//travel line dots
		game.load.image("travelDot", "sprites/travel_dot.png");
		game.load.image("explosion", "sprites/tank_explosion9.png");

		//spritesheets
		game.load.spritesheet("ground","background/treeLeaves_retina.png", 128, 128);
		game.load.spritesheet("animals", "sprites/round_nodetails_outline.png", 71.75, 71.75);
		game.load.atlasXML("blocks", "sprites/spritesheet_wood.png", "sprites/spritesheet_wood.xml");

		//audio
		game.load.audio("main_theme", "audio/main_theme.ogg");
		game.load.audio("launch_effect", "audio/launch_effect.ogg");
		game.load.audio("hit_pig", "audio/hit_pig.ogg");
		game.load.audio("hit_wood", "audio/hit_wood.ogg");
	},

	create: function()
	{
		music = game.add.audio("main_theme");
		hit_pig = game.add.audio("hit_pig");
		hit_wood = game.add.audio("hit_wood");
		launch_effect = game.add.audio("launch_effect");
		game.sound.setDecodedCallback(music, function(){music.play("", 0, 0.3, true);}, this)

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 500;
		game.physics.p2.restitution = 0.5;
		game.world.setBounds(0, 0, 2000, 750);
		game.enableDebug = false;
		game.clearBeforeRender = false;

		game.state.start("play");
	}
}