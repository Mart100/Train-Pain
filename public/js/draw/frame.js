function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	drawGridLines()
	drawGrid()

	for(let player of game.players) {
		drawPlayer(player)
		drawHoldingTrack(player)
	}
}