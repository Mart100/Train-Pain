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

	if(game.trains) {
		for(let train of game.trains) {
			drawTrain(train)
		}
	}

}