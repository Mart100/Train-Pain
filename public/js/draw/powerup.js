function drawPowerup(powerup) {

	let ch = canvas.height
	let cw = canvas.width
	let grid = game.grid

	let gridPixelHeight = grid.height*100
	let leftoverHeight = ch-gridPixelHeight

	let gridPixelWidth = grid.width*100
	let leftoverWidth = cw-gridPixelWidth

	let asset = assets.images.powerups[powerup.type]

	let xPos = (powerup.position.x*100) + leftoverWidth/2
	let yPos = (powerup.position.y*100) + leftoverHeight/2

	ctx.globalAlpha = 0.6
	ctx.drawImage(asset, xPos+30, yPos+30, 40, 40)

	ctx.strokeStyle = 'rgb(0, 200, 0)'
	ctx.lineWidth = 5
	ctx.beginPath()
	ctx.arc(xPos+50, yPos+50, 20, 0, 2*Math.PI)
	ctx.stroke()

	ctx.lineWidth = 1
	ctx.globalAlpha = 1



}