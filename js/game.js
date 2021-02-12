const Vector = require('./vector.js')
const Player = require('./player.js')
const Grid = require('./grid.js')
const Track = require('./track.js')
const Train = require('./train.js')

const tick = require('./process.js')


module.exports =
class Game {
	constructor(id, settings) {
		this.id = id
		this.players = []
		this.grid = new Grid(12, 8)
		this.station = new Vector(0, 3)
		this.trains = []

		this.start()
	}

	start() {
		this.startProcess()

		// place straight piece at station
		this.grid.editTile(this.station.x, this.station.y, new Track(this.station.clone(), 1, 0))

		// spawn first train
		this.spawnTrain()

		this.addRandomTracks(50)
	}

	startProcess() {
		this.processInterval = setInterval(() => {
			tick(this)
		}, 10)
	}

	spawnTrain() {

		let train = new Train(this.station, this)

		this.trains.push(train)

	}

	addRandomTracks(amount) {

		for(let i=0; i<amount; i++) {
			let position = new Vector(Math.floor(Math.random()*this.grid.width), Math.floor(Math.random()*this.grid.height))
			let rotation
			let type = Math.floor(Math.random()*4)+1

			if(type == 1) rotation = Math.floor(Math.random()*2)
			if(type == 2) rotation = Math.floor(Math.random()*4)
			if(type == 3) rotation = 0
			if(type == 4) rotation = Math.floor(Math.random()*2)

			let track = new Track(position, type, rotation)

			if(i > 1000) amount = 0

			// check current tile
			let groundTile = this.grid.getTile(position.x, position.y)
			if(groundTile != 0) {
				amount += 1
				continue
			}

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

	sendTrainData() {

		let trains = []
		for(let train of this.trains) {
			trains.push({
				position: train.position,
				previousPosition: train.previousPosition,
				trackProgression: train.trackProgression
			})
		}

		// send players
		for(let player of this.players) {
			player.socket.emit('trains', {trains: trains, status: 'SUCCESS'})
		}
	}
}