const Vector = require('./vector.js')
const Player = require('./player.js')
const Grid = require('./grid.js')
const Track = require('./track.js')

const tick = require('./process.js')


module.exports =
class Game {
	constructor(id, settings) {
		this.id = id
		this.players = []
		this.grid = new Grid(12, 8)

		this.start()
	}

	start() {
		this.startProcess()

		this.addRandomTracks(50)
	}

	startProcess() {
		this.processInterval = setInterval(() => {
			tick(this)
		}, 10)
	}

	addRandomTracks(amount) {

		for(let i=0; i<amount; i++) {
			let position = new Vector(Math.floor(Math.random()*this.grid.width), Math.floor(Math.random()*this.grid.height))
			let rotation = Math.floor(Math.random()*5)
			let type = Math.floor(Math.random()*5)+1
			let track = new Track(position, type, rotation)

			this.grid.editTile(position.x, position.y, track)
		}

		this.sendGridData()
	}

	newPlayer(player) {

		if(this.players.includes(player)) return console.log('PLAYER ALREADY INSIDE GAME')

		player.position = new Vector(this.grid.width/2, this.grid.height/2)

		this.players.push(player)

		this.sendGridData()

	}

	getPlayerByID(playerID) {
		return this.players.find(p => p.id == playerID)
	}

	sendGridData() {
		
		// send players
		for(let player of this.players) {

			player.socket.emit('grid', {grid: this.grid, status: 'SUCCESS'})
		}
	}
}