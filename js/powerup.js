module.exports = 
class Powerup {
	constructor(pos, type, game) {
		this.position = pos
		this.type = type // [rail, score]

		if(this.position == 'random') this.respawnRandom(game)
	}
	checkTaken(game) {
		for(let train of game.trains) {


			if(!train.position.isIdentical(this.position)) continue
			if(train.trackProgression < 25 || train.trackProgression > 75) continue

			// add 3 rails to map
			if(this.type == 'rail') {
				game.addRandomTracks(3, this.position.clone())
			} 
			
			// add 1 score to game
			else if(this.type == 'score') {
				game.score += 1
			}

			// respawn in new position
			this.respawnRandom(game)

			// update data to users
			game.sendPowerupData()

		}
	}
	respawnRandom(game) {

		let newPos = 0

		while(newPos == 0) {
			let possibleNewPos = game.grid.randomTile().pos

			let notIdentical = true
			for(let powerup of game.powerups) if(powerup.position.isIdentical(possibleNewPos)) notIdentical = false

			if(notIdentical) newPos = possibleNewPos
		}

		this.respawn(newPos)
	}
	respawn(pos) {
		this.position = pos
	}
}