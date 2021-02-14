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

	let posX = (tpos.x)*100 + leftoverWidth/2
	let posY = (tpos.y)*100 + leftoverHeight/2


	// get current track
	let track = grid.getTile(tpos.x, tpos.y)

	// straight rail
	if(track.type == 1) {

		if(track.rotation == 0) { 
			posX += train.trackProgression
			posY += 50
		}
		if(track.rotation == 1) { 
			posX += 50
			posY += train.trackProgression
		}
	}

	// corner rail
	if(track.type == 2) {

		let nextTilePos = train.getNextTilePos(game.grid)
		//console.log(nextTilePos)
		if(!nextTilePos) return
		let previousTile = train.previousPosition

		let angle = ((train.trackProgression/100)*90)*(Math.PI/180)

		let vec1 = nextTilePos.clone().subtract(previousTile)
		let clockwiseTurn = Math.atan2(vec1.x, vec1.y) < Math.PI/2
		if(Math.random() > 0.9) console.log(clockwiseTurn)

		let curve = new Vector(Math.sin(angle)*50, Math.cos(angle)*50)

		if(clockwiseTurn) {
			//curve.rotate(Math.PI/2)
		}

		let curveAngle = train.position.clone().subtract(nextTilePos).getAngle()+90
		curve.rotate(curveAngle*(Math.PI/180))

		curve.x = Math.abs(curve.x)
		curve.y = Math.abs(curve.y)

		if(clockwiseTurn) {
			posY += 100-curve.y
			posX += curve.x
		} else {
			posY += curve.y
			posX += curve.x
		}





		if(Math.random() > 0.9) console.log(curve, angle, curveAngle, posY, posX)
	}

	// cross rail
	if(track.type == 3) {

		let nextTilePos = train.getNextTilePos(game.grid)

		if(!nextTilePos) return

		let previousTile = train.previousPosition
		let direction = nextTilePos.clone().subtract(previousTile)


		if(direction.getAngle() == new Vector(1, 0).getAngle()) { 
			posX += train.trackProgression
			posY += 50
		}
		if(direction.getAngle() == new Vector(0, 1).getAngle()) { 
			posX += 50
			posY += train.trackProgression
		}
	}


	ctx.arc(posX, posY, 10, 0, 2*Math.PI)
	ctx.fill()

}