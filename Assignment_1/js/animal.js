function Animal(posX, posY, spriteIndex)
{
	dots1 = game.add.group();
	dots2 = game.add.group();

	animal = game.add.sprite(posX, posY, "animals", spriteIndex);
	animal.scale.setTo(0.75, 0.75);
	animal.anchor.setTo(0.5, 0.5);
	animal.inputEnabled = true;
	game.physics.arcade.enable(animal);
	animal.body.allowGravity = false;
	animal.body.immovable = true;

	this.update = function()
	{
		if(traveling)
		{
			this.leaveDots();
		}

		if(animal.x > 2000 || animal.x < 0)
		{
			//was considering onOutOfBounds but decided against it for Y coordinate reasons.
			this.reset();
		}
	};

	this.leaveDots = function()
	{
		if(leaveDots)
		{
			if(dotTimer >= dotDelay)
			{
				dot = game.add.sprite(animal.x, animal.y, "travelDot");
				scale = game.rnd.realInRange(0.5, 0.9);
				dot.scale.setTo(0, 0);
				game.add.tween(dot.scale).to({x: scale, y: scale}, 300, Phaser.Easing.Linear.None, true);
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
				dotTimer += game.time.elapsed/60;
			}
		}
	};

	this.launch = function()
	{
		animal.body.allowGravity = true;
		animal.body.immovable = false;
		game.physics.arcade.velocityFromAngle(arrow.angle, power*7.5, animal.body.velocity);

		traveling = true;
		leaveDots = true;
		dotDelay = (180-power)/180 +1.5;
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
	};

	this.reset = function ()
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
		leaveDots = false;
		game.camera.reset();
		animal.angle = 0;
	};
	this.hitObstacleCallback = function(a_animal, a_obstacle)
	{
		//p2 physics happen here
		if(a_obstacle.frame == 51 || a_obstacle.frame == 47)
		{
			a_obstacle.destroy();
		}
		else {
			leaveDots = false;
			a_animal.body.velocity.x *= -0.5;

			if(a_obstacle.frame == 24)
			{
				a_obstacle.frame = 51;
			}

			if(a_obstacle.frame == 19)
			{
				a_obstacle.frame = 24;
			}

			if(a_obstacle.frame == 15)
			{
				a_obstacle.frame = 47;
			}
			
			if(a_obstacle.frame == 12)
			{
				a_obstacle.frame = 15;
			}
		}
	};

	this.hitEnemyCallback = function(a_animal, a_enemy)
	{
		//p2 physics happen here
		leaveDots = false;
		a_enemy.destroy();
	};

	this.hitGroundCallback = function(a_animal, a_ground)
	{
		leaveDots = false;
		velocity = a_animal.body.velocity;
		a_animal.angle += velocity.x/30;

		if(velocity.x > 0)
		{
			a_animal.body.velocity.x -= 2.5;
			if(a_animal.body.velocity.x <= 0)
			{
				currentAnimal.reset();
			}
		}
		else 
		{
			a_animal.body.velocity.x += 2.5;
			if(a_animal.body.velocity.x >= 0)
			{
				currentAnimal.reset();
			}
		}
	};
}