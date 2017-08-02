function Animal(posX, posY, spriteIndex)
{
	dots1 = game.add.group();
	dots2 = game.add.group();

	animal = game.add.sprite(posX, posY, "animals", spriteIndex);
	animal.scale.setTo(0.75, 0.75);
	animal.anchor.setTo(0.5, 0.5);
	animal.inputEnabled = true;
	game.physics.p2.enable(animal);
	animal.body.setCircle(animal.width/2);
	animal.body.static = true;

	animal.body.onBeginContact.add(collisionCallback, this);

	this.update = function()
	{
		if(traveling)
		{
			this.leaveDots();

			if(animal.x > 2050 || animal.x < 0)
			{
				//was considering onOutOfBounds but decided against it for Y coordinate reasons.
				if(addToDots1)
				{
					dots2.destroy(true, true);
				}
				else 
				{
					dots1.destroy(true, true);
				}
				game.time.events.add(Phaser.Timer.SECOND *2, this.reset, this);
				traveling = false;
			}
			else if(animal.body.velocity.x > -2 && animal.body.velocity.x < 2)
			{
				game.time.events.add(Phaser.Timer.SECOND *2, this.reset, this);
				traveling = false;
			}
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
		launch_effect.play("", 0, 0.75. false);
		animal.body.static = false;
		velocity = new Phaser.Point((Math.cos(game.math.degToRad(arrow.angle)) * (power*7.5)), (Math.sin(game.math.degToRad(arrow.angle)) * (power*7.5)));
		animal.body.velocity.x = velocity.x;
		animal.body.velocity.y = velocity.y;


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
		animal.reset(250, 595);
		animal.body.static = true;
		traveling = false;
		leaveDots = false;
		game.camera.reset();
		animal.body.angle = 0;
		animal.body.damping = 0;
	};
}

function collisionCallback (body, shapea, shapeb, equation)
{	
	if(body)
	{
		leaveDots = false;
		if(addToDots1)
		{
			dots2.destroy(true, true);
		}
		else 
		{
			dots1.destroy(true, true);
		}
		//better way for this
		if(body.sprite.key == "blocks")
		{
			hit_wood.play("", 0, 0.5, false);
			if(body.sprite.frame == 51 || body.sprite.frame == 47)
			{
				emitter.x = body.sprite.x;
				emitter.y = body.sprite.y;
				emitter.start(true, 1500, null, 5);
				body.sprite.destroy();
			}
			else {
				//if the sprite sheet was organized better a_obstacle.frame++ could be used instead of if statement mess.
				if(body.sprite.frame == 24)
				{
					body.sprite.frame = 51;
				}

				if(body.sprite.frame == 19)
				{
					body.sprite.frame = 24;
				}

				if(body.sprite.frame == 15)
				{
					body.sprite.frame = 47;
				}
				
				if(body.sprite.frame == 12)
				{
					body.sprite.frame = 15;
				}
			}
		}

		else if(body.sprite.key == "animals")
		{
			hit_pig.play("", 0, 0.5, false);
			body.sprite.destroy();
		}

		else if(body.sprite.key == "ground")
		{
			animal.body.damping = 0.5;
		}
	}
}