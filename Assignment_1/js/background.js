function Background()
{
	game.background = game.add.sprite(0,0, "sky");
	game.background.scale.x = 2;

	clouds = game.add.sprite(0, 400, "clouds");
	clouds.scale.x = 2;
	clouds.scale.y = 1.5;

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
			for(var i = 0; i < 2000/(128*scaleFactor); i++)
			{
				sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(j+1)), "ground");
				sprite.scale.setTo(scaleFactor, scaleFactor);
				if(j == 1)
				{
					game.physics.arcade.enable(sprite);
					sprite.body.allowGravity = false;
					sprite.body.setSize(128, 5, 0, 128);
					sprite.body.immovable = true;
					ground.add(sprite);
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
						game.physics.arcade.enable(sprite);
						sprite.body.allowGravity = false;
						sprite.body.setSize(5, 5, 0, 128);
						sprite.body.immovable = true;
						ground.add(sprite);
					}
					else 
					{
						sprite.frame = 25;
						sprite = game.add.sprite(i*(128*scaleFactor), game.height-((128*scaleFactor)*(3)), "ground");
						sprite.scale.setTo(scaleFactor, scaleFactor);
						sprite.frame = 6;
						game.physics.arcade.enable(sprite);
						sprite.body.allowGravity = false;
						sprite.body.setSize(128, 5, 0, 128);
						sprite.body.immovable = true;
						ground.add(sprite);
					}
				}
				else 
				{
					sprite.frame = 25;
				}
			}
		}
	};

	this.generateBuilding = function()
	{
		//this function should be changed to load an array of blocks and enemies from a level editor.
		//currently it generates a specific building, hardcoded into the game. The blocks (position and spritesheet index) could be stored in an array,
		//and loaded from a level editor.
		block = game.add.sprite(1800, 450, "blocks", 19);
		block.anchor.setTo(0.5, 0);
		game.physics.arcade.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1500, 450, "blocks", 19);
		block.anchor.setTo(0.5, 0);
		game.physics.arcade.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1650, 450, "blocks", 19);
		block.anchor.setTo(0.5, 0);
		game.physics.arcade.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1760, 350, "blocks", 12);
		block.anchor.setTo(0.5, 0);
		game.physics.arcade.enable(block);
		obstacles.add(block);

		block = game.add.sprite(1540, 350, "blocks", 12);
		block.anchor.setTo(0.5, 0);
		game.physics.arcade.enable(block);
		obstacles.add(block);

		enemy = game.add.sprite(1575, 450, "animals", 9);
		enemy.scale.setTo(0.75, 0.75);
		enemy.anchor.setTo(0.5, 0,5);
		game.physics.arcade.enable(enemy);
		enemies.add(enemy);

		enemy = game.add.sprite(1725, 450, "animals", 9);
		enemy.scale.setTo(0.75, 0.75);
		enemy.anchor.setTo(0.5, 0,5);
		game.physics.arcade.enable(enemy);
		enemies.add(enemy);

		enemy = game.add.sprite(1650, 275, "animals", 9);
		enemy.scale.setTo(0.75, 0.75);
		enemy.anchor.setTo(0.5, 0,5);
		game.physics.arcade.enable(enemy);
		enemies.add(enemy);
	};
}