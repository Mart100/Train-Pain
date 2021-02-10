const Vector = require('./vector.js')
const Player = require('./player.js')
const tick = require('./process.js')


module.exports =
class Game {
	constructor(id, settings) {
		this.id = id
		this.players = []

		this.start()
	}

	start() {
		this.startProcess()
	}

	startProcess() {
		this.processInterval = setInterval(() => {
			tick(this)
		}, 10)
	}

	newPlayer(player) {

		if(this.players.includes(player)) return console.log('PLAYER ALREADY INSIDE GAME')

		this.players.push(player)


	}

	getPlayerByID(playerID) {
		return this.players.find(p => p.id == playerID)
	}
}