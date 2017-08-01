function Background()
{
	game.background = game.add.sprite(0,0, "sky");
	game.background.scale.x = 2;

	clouds = game.add.sprite(0, 400, "clouds");
	clouds.scale.x = 2;
	clouds.scale.y = 1.5;
	clouds.fixedToCamera = true;

	game.add.sprite(260, game.height-game.cache.getImage("big_rock").height - 64, "big_rock");
	game.add.sprite(1560, game.height-game.cache.getImage("big_rock").height - 64, "big_rock");
	game.add.sprite(975, game.height-game.cache.getImage("small_rock").height - 64, "small_rock");
	game.add.sprite(30, 320, "tree_1");
	game.add.sprite(1300, 450, "tree_2");

	ground = game.add.group();
	obstacles = game.add.group();
	enemies = game.add.group();

	this.generateGround = function()
	{
		//this function should be changed to load an array of tiles from a level editor.
		//currently it checks for specific tiles to change the sprite frame and body size, this information could all be stored in an array of custom objects,
		//loaded from a level editor.
		for(var j = 0; j <= 1; j++)
		{
			for(var i = 0; i < game.world.width+100/(128*scaleFactor); i++)
			{
				sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(j+1)), "ground");
				sprite.scale.setTo(scaleFactor, scaleFactor);
				if(j == 0)
				{
					sprite.frame = 25;
					sprite.y += 32;
					game.physics.p2.enable(sprite);
					sprite.body.static = true;
					ground.add(sprite);
				}
				else
				{
					if(i > 6)
					{
						sprite.frame = 6;
						ground.add(sprite);
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
						sprite.y += 32;
						sprite.x += 32;
						game.physics.p2.enable(sprite);
						sprite.body.static = true;
						ground.add(sprite);

						sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(3)), "ground");
						sprite.scale.setTo(scaleFactor, scaleFactor);
						sprite.frame = 6;
					}
				}
			}
		}
	};

	this.generateBuilding = function()
	{
		//this function should be changed to load an array of blocks and enemies from a level editor.
		//currently it generates a specific building, hardcoded into the game. The blocks (position and spritesheet index) could be stored in an array,
		//and loaded from a level editor.
		block = game.add.sprite(1800, 576, "blocks", 19);
		game.physics.p2.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1500, 576, "blocks", 19);
		game.physics.p2.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1650, 576, "blocks", 19);
		game.physics.p2.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1760, 431, "blocks", 12);
		game.physics.p2.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1540, 431, "blocks", 12);
		game.physics.p2.enable(block);
		obstacles.add(block);

		enemy = game.add.sprite(1575, 660, "animals", 9);
		enemy.scale.setTo(0.75, 0.75);
		enemy.anchor.setTo(0.5, 0,5);
		game.physics.p2.enable(enemy);
		enemy.body.setCircle(enemy.width/2);
		enemies.add(enemy);

		enemy = game.add.sprite(1725, 660, "animals", 9);
		enemy.scale.setTo(0.75, 0.75);
		enemy.anchor.setTo(0.5, 0,5);
		game.physics.p2.enable(enemy);
		enemy.body.setCircle(enemy.width/2);
		enemies.add(enemy);

		enemy = game.add.sprite(1650, 370, "animals", 9);
		enemy.scale.setTo(0.75, 0.75);
		enemy.anchor.setTo(0.5, 0,5);
		game.physics.p2.enable(enemy);
		enemy.body.setCircle(enemy.width/2);
		enemies.add(enemy);
	};
}