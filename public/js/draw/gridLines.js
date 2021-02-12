function drawGridLines() {

	let ch = canvas.height
	let cw = canvas.width
	let grid = game.grid

	let gridPixelHeight = grid.height*100
	let leftoverHeight = ch-gridPixelHeight

	let gridPixelWidth = grid.width*100
	let leftoverWidth = cw-gridPixelWidth

	// draw horizontal lines
	ctx.strokeStyle = 'rgb(255,255,255)'

	for(let y=0;y<grid.height+1;y++) {

		let yPos = (y*100) + leftoverHeight/2
		let xPos = leftoverWidth/2

		ctx.beginPath()
		ctx.moveTo(xPos,    yPos)
		ctx.lineTo(cw-xPos, yPos)
		ctx.stroke()
	}

	// draw vertical lines
	ctx.strokeStyle = 'rgb(255,255,255)'

	for(let x=0;x<grid.width+1;x++) {

		let xPos = (x*100) + leftoverWidth/2
		let yPos = leftoverHeight/2

		ctx.beginPath()
		ctx.moveTo(xPos, yPos)
		ctx.lineTo(xPos, ch-yPos)
		ctx.stroke()
	}
}