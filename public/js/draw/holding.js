function drawHoldingTrack(player) {

	let ppos = player.position
	let track = player.holding

	if(track == 0) return

	let ch = canvas.height
	let cw = canvas.width
	let grid = game.grid

	let gridPixelHeight = grid.height*100
	let leftoverHeight = ch-gridPixelHeight

	let gridPixelWidth = grid.width*100
	let leftoverWidth = cw-gridPixelWidth

	let xPos = (ppos.x*100) + leftoverWidth/2
	let yPos = (ppos.y*100) + leftoverHeight/2

	let asset = assets.images.tracks[track.type]

	ctx.save()

	ctx.translate(xPos+0, yPos+0)
	ctx.rotate((track.rotation*90)*(Math.PI/180))

	ctx.globalAlpha = 0.2
	ctx.fillStyle = 'rgb(50,50,50)'
	ctx.fillRect(-50, -50, 100, 100)

	ctx.globalAlpha = 0.6
	ctx.drawImage(asset, -50, -50, 100, 100)

	ctx.restore()
}