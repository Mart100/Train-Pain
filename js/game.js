const Vector = require('./vector.js')
const Player = require('./player.js')
const Grid = require('./grid.js')
const Track = require('./track.js')
const Train = require('./train.js')
const Powerup = require('./powerup.js')

const tick = require('./process.js')


module.exports =
class Game {
	constructor(id, settings) {
		this.id = id
		this.players = []
		this.grid = new Grid(12, 8)
		this.station = new Vector(0, 3)
		this.trains = []
		this.powerups = []
		this.score = 0

		this.newTrainInterval = 40*1000
		this.trainSpeed = 0.3

		this.start()
	}

	start() {
		this.startProcess()

		// place straight piece at station
		this.grid.editTile(this.station.x, this.station.y, new Track(this.station.clone(), 1, 0))

		// spawn first train
		this.spawnTrain()

		// add powerups
		
		for(let i=0;i<4;i++) this.powerups.push(new Powerup('random', 'rail', this))
		for(let i=0;i<4;i++) this.powerups.push(new Powerup('random', 'score', this))

		this.addRandomTracks(20)
	}

	startProcess() {
		this.processIntervalFunction = setInterval(() => {
			tick(this)
		}, 25)

		this.newTrainIntervalFunction = setInterval(() => {
			this.spawnTrain()
		}, this.newTrainInterval)
	}

	spawnTrain() {

		let train = new Train(this.station, this)
		train.speed = this.trainSpeed

		this.trains.push(train)

	}

	addRandomTracks(amount, spawnPos) {

		for(let i=0; i<amount; i++) {
			let position = new Vector(Math.floor(Math.random()*this.grid.width), Math.floor(Math.random()*this.grid.height))

			if(spawnPos) {
				let closerPos = position.clone()
				let newPos = 0
				while(newPos == 0) {
					let direction = position.clone().subtract(spawnPos).setMagnitude(1)
					let directionBlock = new Vector(Math.round(direction.x), Math.round(direction.y))
					let closererPos = closerPos.clone().add(directionBlock)

					let groundTile = this.grid.getTile(closererPos.x, closererPos.y)

					if(groundTile != 0) { // occupied tile
						newPos = closerPos.clone()
					}

					else {
						closerPos = closererPos
					}


				}

			}

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
		this.sendPowerupData()

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
				trackProgression: train.trackProgression,
				id: train.id,
				speeding: train.speeding
			})
		}

		// send players
		for(let player of this.players) {
			player.socket.emit('trains', {trains: trains, status: 'SUCCESS'})
		}
	}

	sendPowerupData() {

		// send players
		for(let player of this.players) {
			player.socket.emit('powerups', {powerups: this.powerups, status: 'SUCCESS'})
		}
	}
}