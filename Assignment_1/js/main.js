var game = new Phaser.Game(1334, 750, Phaser.CANVAS, 'phaser-test', {preload: preload, create: create, update: update, render: render});
var scaleFactor = 0.5;
var power = 0;
var traveling = false;
var leaveDots = false;
var dotDelay = 1.5;
var dotTimer = 0;
var addToDots1 = true;

function preload()
{
	//scenery
	game.load.path = "assets/";

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

	//launch indicator
	game.load.image("arrow_empty", "sprites/tank_arrowEmpty.png");
	game.load.image("arrow_full", "sprites/tank_arrowFull.png");

	//travel line dots
	game.load.image("travelDot", "sprites/tank_explosion9.png");

	//spritesheets
	game.load.spritesheet("ground","background/treeLeaves_retina.png", 128, 128);
	game.load.spritesheet("animals", "sprites/round_nodetails_outline.png", 71.75, 71.75);
	game.load.atlasXML("blocks", "sprites/spritesheet_wood.png", "sprites/spritesheet_wood.xml");

	//audio
	game.load.audio('main_theme', "audio/main_theme.ogg");

	game.renderer.setTexturePriority(["animals", "blocks", "ground", "travelDot", "sky", "clouds"]);
}

function create()
{
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 500;
	game.physics.p2.restitution = 0.5;
	game.world.setBounds(0, 0, 2000, 750);
	game.enableDebug = false;
	game.clearBeforeRender = false;

	music = game.add.audio("main_theme");

	game.sound.setDecodedCallback(music, function(){music.play("", 0, 0.3, true);}, this)

	game.physics.p2.updateBoundsCollisionGroup();

	background = new Background();
	background.generateGround();
	background.generateBuilding();

	currentAnimal = new Animal(250, 595, 1);
	//secondAnimal = new Animal(150, 595, 0);
	indicatorArrow = new Arrow();
}

function update()
{
	currentAnimal.update();
	indicatorArrow.update();

	if (!traveling && game.input.activePointer.leftButton.isDown && !arrow.visible) 
	{
		if (game.origDragPoint) 
		{				
			game.camera.x += game.origDragPoint.x - game.input.activePointer.position.x;		
		}	

		game.origDragPoint = game.input.activePointer.position.clone();
	}
	else 
	{	
		game.origDragPoint = null
	}
}

function render()
{
}
