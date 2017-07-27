var game = new Phaser.Game(1334, 750, Phaser.AUTO, 'phaser-test', {preload: preload, create: create, update: update, render: render});
var scaleFactor = 0.5;
var power = 0;
var traveling = false;
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
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 200;
	game.world.setBounds(0, 0, 2000, 750);

	game.background = game.add.sprite(0,0, "sky");
	game.background.scale.x = 2;

	clouds = game.add.sprite(0, 400, "clouds");
	clouds.scale.x = 2;
	clouds.scale.y = 1.5;

	game.add.sprite(260, game.height-game.cache.getImage("big_rock").height - 64, "big_rock");
	game.add.sprite(1560, game.height-game.cache.getImage("big_rock").height - 64, "big_rock");
	game.add.sprite(975, game.height-game.cache.getImage("small_rock").height - 64, "small_rock");
	game.add.sprite(30, 320, "tree_1");
	game.add.sprite(1330, 450, "tree_2");

	ground = game.add.group();
	obstacles = game.add.group();
	GenerateGround();
	GenerateBuilding();
	dots1 = game.add.group();
	dots2 = game.add.group();

	animal = game.add.sprite(250, game.height-155, "animals", 1);
	animal.scale.setTo(0.75, 0.75);
	animal.anchor.setTo(0.5, 0.5);
	animal.inputEnabled = true;

	game.physics.arcade.enable(animal);
	animal.body.allowGravity = false;
	animal.body.immovable = true;

	arrow = game.add.sprite(animal.x, animal.y, "arrow_empty");
	arrow.scale.setTo(0.75, 0.75);
	arrow.anchor.setTo(0, 0.5);
	arrow.pivot.x = -60;
	arrow.visible = false;

	arrowFill = game.add.sprite(0, 0, "arrow_full");
	arrowFill.anchor.setTo(0, 0.5);

	cropRect = new Phaser.Rectangle(0, 0, 0, 96);
	arrowFill.crop(cropRect);

	arrow.addChild(arrowFill);

}

function update()
{
	if(traveling)
	{
		if(dotTimer >= dotDelay)
		{
			dot = game.add.sprite(animal.x, animal.y, "travelDot");
			scale = game.rnd.realInRange(0.5, 0.9);
			dot.scale.setTo(scale, scale);
			dot.anchor.setTo(0.5, 0.5);
			dot.tint = 0xffffff;
			if(addToDots1)
			{
				dots1.add(dot);
			}
			else
			{
				dots2.add(dot);
			}
			dotTimer = 0;
		}
		else 
		{
			dotTimer += game.time.elapsed/100;
		}
	}

	else 
	{
		if(game.input.activePointer.leftButton.isDown && animal.input.pointerOver())
		{
			arrow.visible = true;
			arrowFill.visible = true;		
		}
		else if(game.input.activePointer.leftButton.isUp && arrow.visible)
		{
			arrow.visible = false;
			arrowFill.visible = false;
			cropRect.width = 0;
			Launch();
		}
		
		else if (game.input.activePointer.leftButton.isDown && !arrow.visible) 
		{
			//doesnt work quite right
			game.camera.y -= game.input.mouse.event.movementY;
			game.camera.x -= game.input.mouse.event.movementX;
		}

		if(arrow.visible)
		{
			arrow.rotation = game.physics.arcade.angleBetween(game.input.mousePointer, arrow); //rotation offset
			power = game.physics.arcade.distanceBetween(game.input.mousePointer, arrow);
			if(power > 180)
			{
				power = 180;
			}
			cropRect.width = power;
			arrowFill.updateCrop();
			//arrowFill.rotation = arrow.rotation;
		}
	}

	if(animal.x > 2000 || animal.x < 0)
	{
		ResetAnimal();
	}
	game.physics.arcade.collide(animal, ground);
	game.physics.arcade.collide(animal, obstacles, HitCallback);
	game.physics.arcade.collide(obstacles, ground);
	game.physics.arcade.collide(obstacles);
}

function render()
{
	game.debug.text(animal.body.velocity, 50, 50);
	game.debug.text(dotDelay, 50, 200);
}

function HitCallback(a_animal, a_obstacle)
{
	//switch to p2 physics
	a_obstacle.body.angularVelocity = a_animal.body.angularVelocity;
}

function GenerateGround()
{
	//this function could be changed to load an array of tiles from a level editor.
	for(var j = 0; j <= 1; j++)
	{
		for(var i = 0; i < 2000/(128*scaleFactor); i++)
		{
			sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(j+1)), "ground");
			sprite.scale.setTo(scaleFactor, scaleFactor);
			if(j == 1)
			{
				if(i > 6)
				{
					sprite.frame = 6;
				}
				else if(i == 6)
				{
					sprite.frame = 4;
					sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(3)), "ground");
					sprite.scale.setTo(scaleFactor, scaleFactor);
					sprite.frame = 7;
				}
				else 
				{
					sprite.frame = 25;
					sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(3)), "ground");
					sprite.scale.setTo(scaleFactor, scaleFactor);
					sprite.frame = 6;
				}
				game.physics.arcade.enable(sprite);
				sprite.body.allowGravity = false;
				sprite.body.setSize(128, 5, 0, 128);
				sprite.body.immovable = true;
				ground.add(sprite);
			}
			else 
			{
				sprite.frame = 25;
			}
		}
	}
}

function GenerateBuilding()
{
	//this function could be changed to load an array of blocks from a level editor.
	block = game.add.sprite(1750, 450, "blocks", 19);
	block.anchor.setTo(0.5, 0);
	game.physics.arcade.enable(block);
	obstacles.add(block);
	enemy = game.add.sprite(1750, 375, "animals", 9);
	enemy.scale.setTo(0.75, 0.75);
	enemy.anchor.setTo(0.5, 0,5);
	game.physics.arcade.enable(enemy);
	obstacles.add(enemy);
}

function Launch()
{
	animal.body.allowGravity = true;
	animal.body.immovable = false;
	game.physics.arcade.velocityFromAngle(arrow.angle, power*7.5, animal.body.velocity);

	traveling = true;
	dotDelay = (180-power)/180 +2;
	dotTimer = dotDelay;

	game.camera.follow(animal);

	if(dots1.countLiving() == 0)
	{
		addToDots1 = true;
	}
	else
	{
		addToDots1 = false;
	}
}

function ResetAnimal()
{
	if(addToDots1)
	{
		dots2.destroy(true, true);
	}
	else 
	{
		dots1.destroy(true, true);
	}
	animal.reset(250, game.height-155);
	animal.body.allowGravity = false;
	animal.body.immovable = true;
	traveling = false;
	game.camera.reset();
}
