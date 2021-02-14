class Train {
	constructor(trainData) {
		this.position = new Vector(trainData.position.x, trainData.position.y)
		this.trackProgression = trainData.trackProgression
		this.previousPosition = new Vector(trainData.previousPosition.x, trainData.previousPosition.y)
	}
	getNextTilePos(grid) {
		// get current track
		let track = grid.getTile(this.position.x, this.position.y)

		if(track == undefined) return

		let opposite = this.position.clone().subtract(this.previousPosition)

		let nextTilePos

		// straight rail
		if(track.type == 1) {

			let straights = [
				[new Vector(1, 0), new Vector(-1, 0)],
				[new Vector(0, 1), new Vector(0, -1)],
			]

			let straight = straights[track.rotation]

			if(opposite.clone().subtract(straight[0]).getMagnitude() == 0) nextTilePos = this.position.clone().add(straight[1].rotate(Math.PI))
			else if(opposite.clone().subtract(straight[1]).getMagnitude() == 0) nextTilePos = this.position.clone().add(straight[0].rotate(Math.PI))

		}

		// corner rail
		else if(track.type == 2) {

			let corners = {
				0: [new Vector(1, 0), new Vector(0, -1)],
				1: [new Vector(1, 0), new Vector(0, 1)],
				2: [new Vector(-1, 0), new Vector(0, 1)],
				3: [new Vector(-1, 0), new Vector(0, -1)]
			}

			let corner = corners[track.rotation]

			if(opposite.clone().subtract(corner[0]).getMagnitude() == 0) nextTilePos = this.position.clone().add(corner[1].rotate(Math.PI))
			else if(opposite.clone().subtract(corner[1]).getMagnitude() == 0) nextTilePos = this.position.clone().add(corner[0].rotate(Math.PI))

			else return
		}

		// cross rail
		else if(track.type == 3) {
			nextTilePos = this.position.clone().add(opposite)
		}

		// double corner rail
		else if(track.type == 4) {

			let doublecorners = [
				[[new Vector(1, 0), new Vector(0, -1)], [new Vector(-1, 0), new Vector(0, 1)]],
				[[new Vector(1, 0), new Vector(0, 1)], [new Vector(-1, 0), new Vector(0, -1)]]
			]

			let doublecorner = doublecorners[track.rotation]

			if(opposite.clone().subtract(doublecorner[0][0]).getMagnitude() == 0) nextTilePos = this.position.clone().add(doublecorner[0][1].rotate(Math.PI))
			else if(opposite.clone().subtract(doublecorner[0][1]).getMagnitude() == 0) nextTilePos = this.position.clone().add(doublecorner[0][0].rotate(Math.PI))
			else if(opposite.clone().subtract(doublecorner[1][0]).getMagnitude() == 0) nextTilePos = this.position.clone().add(doublecorner[1][1].rotate(Math.PI))
			else if(opposite.clone().subtract(doublecorner[1][1]).getMagnitude() == 0) nextTilePos = this.position.clone().add(doublecorner[1][0].rotate(Math.PI))

			else return

		}

		if(!nextTilePos) return
		return new Vector(Math.floor(nextTilePos.x), Math.floor(nextTilePos.y))
	}
	getNextTile(grid) {
		let nextTilePos = this.getNextTilePos(grid)
		let nextTile = grid.getTile(nextTilePos.x, nextTilePos.y)
		return nextTile
	}
}