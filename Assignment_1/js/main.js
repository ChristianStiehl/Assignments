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
	game.load.image("sky", "assets/background/sky.png");
	game.load.image("clouds", "assets/background/clouds2.png");
	game.load.image("big_rock", "assets/background/foliagePack_054.png");
	game.load.image("small_rock", "assets/background/foliagePack_055.png");
	game.load.image("big_bush", "assets/background/foliagePack_051.png");
	game.load.image("small_bush", "assets/background/foliagePack_053.png");
	game.load.image("tree_1", "assets/background/tree02.png");
	game.load.image("tree_2", "assets/background/tree10.png");
	game.load.image("debris_1", "assets/sprites/debrisWood_1.png");
	game.load.image("debris_2", "assets/sprites/debrisWood_2.png");
	game.load.image("debris_3", "assets/sprites/debrisWood_3.png");

	//launch indicator
	game.load.image("arrow_empty", "assets/sprites/tank_arrowEmpty.png");
	game.load.image("arrow_full", "assets/sprites/tank_arrowFull.png");

	//travel line dots
	game.load.image("travelDot", "assets/sprites/tank_explosion9.png");

	//spritesheets
	game.load.spritesheet("ground","assets/background/treeLeaves_retina.png", 128, 128);
	game.load.spritesheet("animals", "assets/sprites/round_nodetails_outline.png", 71.5, 71.5);
	game.load.atlasXML("blocks", "assets/sprites/spritesheet_wood.png", "assets/sprites/spritesheet_wood.xml");
}

function create()
{
	//switch to P2
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;
	game.world.setBounds(0, 0, 2000, 750);

	//for fps debugging
	//game.time.advancedTiming = true;

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

	game.physics.arcade.collide(animal, ground, currentAnimal.hitGroundCallback);
	game.physics.arcade.collide(animal, obstacles, currentAnimal.hitObstacleCallback);
	game.physics.arcade.collide(animal, enemies, currentAnimal.hitEnemyCallback);
	game.physics.arcade.collide(obstacles, ground);
	game.physics.arcade.collide(obstacles, enemies);
	game.physics.arcade.collide(obstacles);
	game.physics.arcade.collide(enemies);
	game.physics.arcade.collide(enemies, ground);
}

function render()
{
	//for fps debugging.
 	//game.debug.text(game.time.fps, 50, 50);
}
