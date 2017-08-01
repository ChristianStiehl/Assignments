function Block()
{
	block = game.add.sprite(1750, 450, "blocks", 19);
	block.anchor.setTo(0.5, 0);
	game.physics.arcade.enable(block);
	obstacles.add(block);

	this.hit = function()
	{
		block.frame = 51;
	}
}