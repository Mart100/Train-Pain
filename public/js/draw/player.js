function drawPlayer(player) {

	let ppos = player.position
	ctx.fillStyle = 'rgb(255, 0, 0)'
	ctx.beginPath()
	ctx.arc(ppos.x*100, ppos.y*100, 10, 0, 2*Math.PI)
	ctx.fill()

}