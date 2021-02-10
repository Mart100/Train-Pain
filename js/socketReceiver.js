const utils = require('./utils.js')
const Game = require('./game.js')
const Player = require('./player.js')
const Vector = require('./vector.js')


module.exports = 
function socketReceiver(socket, games) {
	socket.on('newGame', (data, callback) => {
		let id = utils.randomToken(6)
		let game = new Game(id)

		// append game to games list
		games.push(game)

		// return success with gameData to client
		let gameData = {
			id: game.id,
			players: [],
			grid: game.grid
		}
		callback({status: 'SUCCESS', gameData})
	})

	socket.on('joinGame', (data, callback) => {
		let username = data.username
		let gameID = data.gameID
		let game = games.find(g => g.id == gameID)

		// if game isn't found
		if(game == undefined) {
			callback({status: 'GAME_NOT_FOUND'})
			return
		}

		// create player class
		let player = new Player()
		player.username = username
		player.socket = socket
		player.id = socket.id

		// add player to game
		game.newPlayer(player)

		// return success with gameData to client
		let gameData = {
			id: game.id,
			players: [],
			grid: game.grid
		}
		callback({status: 'SUCCESS', gameData})
	})

	socket.on('PLAYER_MOVEMENT', (data, callback) => {


		let gameID = data.gameID

		let movementData = data.movement
		let movement = new Vector(movementData.x, movementData.y)
		
		let game = games.find(g => g.id == gameID)
		let player = game.getPlayerByID(socket.id)

		player.position.add(movement)

	})
}