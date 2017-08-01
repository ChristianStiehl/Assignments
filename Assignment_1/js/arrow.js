function Arrow()
{
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

	this.update = function()
	{
		if(!traveling) 
		{
			if(game.input.activePointer.leftButton.isDown && animal.input.pointerOver())
			{
				arrow.visible = true;
				arrowFill.visible = true;
				game.camera.reset();	
			}
			else if(game.input.activePointer.leftButton.isUp && arrow.visible)
			{
				arrow.visible = false;
				arrowFill.visible = false;
				cropRect.width = 0;
				currentAnimal.launch();
			}

			if(arrow.visible)
			{
				//switch to p2
				arrow.rotation = game.input.mousePointer.position.angle(new Phaser.Point(250, 595));
				power = game.input.mousePointer.position.distance(new Phaser.Point(250, 595)); 
				if(power > 180)
				{
					power = 180;
				}
				cropRect.width = power;
				arrowFill.updateCrop();
				//arrowFill.rotation = arrow.rotation;
			}
		}
	};
}