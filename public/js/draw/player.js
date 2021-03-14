function drawPlayer(player) {

	let pos = this.getPlayerScreenPosition(player)

	ctx.arc(pos.x, pos.y, 10, 0, 2*Math.PI)
	ctx.fill()

}

function getPlayerScreenPosition(player) {

	let ch = canvas.height
	let cw = canvas.width
	let grid = game.grid

	let gridPixelHeight = grid.height*100
	let leftoverHeight = ch-gridPixelHeight

	let gridPixelWidth = grid.width*100
	let leftoverWidth = cw-gridPixelWidth

	let ppos = player.position
	ctx.fillStyle = 'rgb(255, 0, 0)'
	ctx.beginPath()

	let posX = ppos.x*100 + leftoverWidth/2
	let posY = ppos.y*100 + leftoverHeight/2

	return new Vector(posX, posY)
}