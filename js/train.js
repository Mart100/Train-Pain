const Vector = require('./vector.js')

module.exports =
class Train {
	constructor(startPosition, game) {
		this.position = startPosition.clone()
		this.previousPosition = startPosition.clone().subtract(new Vector(1, 0))
		this.trackProgression = 0 // 0 - 100
		this.speed = 4
		this.game = game
	}
	move() {
		this.trackProgression += this.speed

		let previousPosition = new Vector(Math.round(this.position.x), Math.round(this.position.y))

		// move to next tile
		if(this.trackProgression > 100) {


			// get current track
			let track = this.game.grid.getTile(this.position.x, this.position.y)

			if(track == undefined) return

			let opposite = this.position.clone().subtract(this.previousPosition)

			// straight rail
			if(track.type == 1) {

				let straights = [
					[new Vector(1, 0), new Vector(-1, 0)],
					[new Vector(0, 1), new Vector(0, -1)],
				]

				let straight = straights[track.rotation]

				if(opposite.clone().subtract(straight[0]).getMagnitude() == 0) this.position.add(straight[1].rotate(Math.PI))
				else if(opposite.clone().subtract(straight[1]).getMagnitude() == 0) this.position.add(straight[0].rotate(Math.PI))

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

				if(opposite.clone().subtract(corner[0]).getMagnitude() == 0) this.position.add(corner[1].rotate(Math.PI))
				else if(opposite.clone().subtract(corner[1]).getMagnitude() == 0) this.position.add(corner[0].rotate(Math.PI))

				else return
			}

			// cross rail
			else if(track.type == 3) {
				this.position.add(opposite)
			}

			// double corner rail
			else if(track.type == 4) {

				let doublecorners = [
					[[new Vector(1, 0), new Vector(0, -1)], [new Vector(-1, 0), new Vector(0, 1)]],
					[[new Vector(1, 0), new Vector(0, 1)], [new Vector(-1, 0), new Vector(0, -1)]]
				]

				let doublecorner = doublecorners[track.rotation]

				if(opposite.clone().subtract(doublecorner[0][0]).getMagnitude() == 0) this.position.add(doublecorner[0][1].rotate(Math.PI))
				else if(opposite.clone().subtract(doublecorner[0][1]).getMagnitude() == 0) this.position.add(doublecorner[0][0].rotate(Math.PI))
				else if(opposite.clone().subtract(doublecorner[1][0]).getMagnitude() == 0) this.position.add(doublecorner[1][1].rotate(Math.PI))
				else if(opposite.clone().subtract(doublecorner[1][1]).getMagnitude() == 0) this.position.add(doublecorner[1][0].rotate(Math.PI))

				else return

			}

			// set previous Position if moved
			if(this.position.clone().subtract(previousPosition).getMagnitude() > 0) {
				this.previousPosition = previousPosition.clone()
			}

			this.position = new Vector(Math.round(this.position.x), Math.round(this.position.y))

			
			
			this.trackProgression = 0
		}
	}
}