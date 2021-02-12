function drawTrain(train) {

	let ch = canvas.height
	let cw = canvas.width
	let grid = game.grid

	let gridPixelHeight = grid.height*100
	let leftoverHeight = ch-gridPixelHeight

	let gridPixelWidth = grid.width*100
	let leftoverWidth = cw-gridPixelWidth

	let tpos = train.position
	ctx.fillStyle = 'rgb(255, 0, 0)'
	ctx.beginPath()

	let poxX = (tpos.x+0.5)*100 + leftoverWidth/2
	let posY = (tpos.y+0.5)*100 + leftoverHeight/2

	ctx.arc(poxX, posY, 10, 0, 2*Math.PI)
	ctx.fill()
}