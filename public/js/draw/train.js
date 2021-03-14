function drawTrain(train) {

	let pos = getPreciseTrainPositionOnScreen(train)

	if(!pos) return


	ctx.fillStyle = 'rgb(0, 0, 255)'
	ctx.beginPath()
	ctx.arc(pos.x, pos.y, 10, 0, 2*Math.PI)
	ctx.fill()

	// if train is speeding
	if(train.speeding) {
		ctx.fillStyle = 'rgb(255, 255, 0)'
		ctx.beginPath()
		ctx.arc(pos.x, pos.y, 4, 0, 2*Math.PI)
		ctx.fill()
	}

}

function getPreciseTrainPositionOnScreen(train) {

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
	if(track.type == 2 || track.type == 4) {

		let previousTile = train.previousPosition

		let nextTilePos = train.getNextTilePos(game.grid)
		if(!nextTilePos) return

		let exitDirection = nextTilePos.clone().subtract(train.position)
		let entryDirection = train.position.clone().subtract(previousTile)


		let angle = ((train.trackProgression/100)*90)*(Math.PI/180)
		let curve = new Vector(Math.sin(angle)*50, Math.cos(angle)*50)

		let curveOptions = [
			/*[ entry_direction exit_direction          curve_x  curve_y ]*/
			
			[ new Vector(1, 0), new Vector(0, -1), curve.x, curve.y ],
			[ new Vector(1, 0), new Vector(0, 1), curve.x, 100+(curve.y*-1) ],

			[ new Vector(0, 1), new Vector(-1, 0), curve.x, curve.y, true ],
			[ new Vector(0, 1), new Vector(1, 0), curve.x, 100+(curve.y*-1), true ],

			[ new Vector(0, -1), new Vector(-1, 0), 100+(curve.x*-1), curve.y, true  ],
			[ new Vector(0, -1), new Vector(1, 0), 100+(curve.x*-1), 100+(curve.y*-1), true ],

			[ new Vector(-1, 0), new Vector(0, -1), 100+(curve.x*-1), curve.y ],
			[ new Vector(-1, 0), new Vector(0, 1), 100+(curve.x*-1), 100+(curve.y*-1) ],
		]

		let curveFound = false

		for(let possibleCurve of curveOptions) {

			if(curveFound) continue

			if(!possibleCurve[0].isIdentical(entryDirection)) continue
			if(!possibleCurve[1].isIdentical(exitDirection)) continue

			if(possibleCurve[4]) {
				posX += possibleCurve[3]
				posY += possibleCurve[2]
			} else {
				posX += possibleCurve[2]
				posY += possibleCurve[3]
			}

			curveFound = possibleCurve

			break

		}

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

	return {x: posX, y: posY}
}