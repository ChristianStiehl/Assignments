var scaleFactor = 0.5;
var power = 0;
var traveling = false;
var leaveDots = false;
var dotDelay = 1.5;
var dotTimer = 0;
var addToDots1 = true;
var emitter;

var playState = {
	create: function()
	{
		traveling = false;
		leaveDots = false;
		dotDelay = 1.5;
		dotTimer = 0;
		addToDots1 = true;

		game.physics.p2.updateBoundsCollisionGroup();

		background = new Background();
		background.generateGround();
		background.generateBuilding();

		currentAnimal = new Animal(250, 595, 1);
		//secondAnimal = new Animal(150, 595, 1);
		indicatorArrow = new Arrow();

		pauseButton = game.add.button(5, 5, "UI", pauseCallback, this);
		pauseButton.frame = 66;
		pauseButton.fixedToCamera = true;

		muteButton = game.add.button(205, 5, "UI", audioCallback, this);
		if(game.sound.mute)
		{
			muteButton.frame = 4;
		}
		else
		{
			muteButton.frame = 5;
		}
		muteButton.fixedToCamera = true;

		resetButton = game.add.button(105, 5, "UI", resetCallback, this);
		resetButton.frame = 72;
		resetButton.fixedToCamera = true;

		emitter = game.add.emitter(0, 0, 20);
		emitter.width = 200;
		emitter.makeParticles(["debris_1", "debris_2", "debris_3"]);
		emitter.gravity = 300;
	},
	update: function()
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
	},

	render: function()
	{
	},
}

function pauseCallback()
{
	game.paused = !game.paused;
	if(game.paused)
	{
		pauseButton.frame = 74;
	}
	else 
	{
		pauseButton.frame = 66;
	}
}

function audioCallback()
{
	if(!game.paused)
	{
		game.sound.mute = !game.sound.mute;
		if(game.sound.mute)
		{
			muteButton.frame = 4;
		}
		else
		{
			muteButton.frame = 5;
		}
	}
}

function resetCallback()
{
	if(!game.paused)
	{
		game.state.start("play");
	}
}