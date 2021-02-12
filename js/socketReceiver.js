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
			grid: game.grid,
			station: game.station
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
			grid: game.grid,
			station: game.station
		}
		callback({status: 'SUCCESS', gameData})
	})

	socket.on('PLAYER_MOVEMENT', (data, callback) => {


		let gameID = data.gameID

		let movementData = data.movement
		let movement = new Vector(movementData.x, movementData.y)
		
		// get player in game
		let game = games.find(g => g.id == gameID)
		if(game == undefined) return callback({status: "GAME_ID_NOT_FOUND"})
		let player = game.getPlayerByID(socket.id)

		let newPosition = player.position.clone().add(movement)

		// check if outside borders, if so, correct
		if(newPosition.x < 0) newPosition.x = 0
		if(newPosition.x > game.grid.width) newPosition.x = game.grid.width
		if(newPosition.y < 0) newPosition.y = 0
		if(newPosition.y > game.grid.height) newPosition.y = game.grid.height
		
		// update player position
		player.position = newPosition.clone()

		callback({status: 'SUCCESS'})


	})

	socket.on('PICKUP_OR_PLACE_TRACK', (data, callback) => {

		//console.log(data)

		let gameID = data.gameID

		// find player in game
		let game = games.find(g => g.id == gameID)
		if(game == undefined) return callback({status: "GAME_ID_NOT_FOUND"})
		let player = game.getPlayerByID(socket.id)

		// get position of gridTile under player
		let ppos = player.position
		let gridPos = new Vector(Math.floor(ppos.x), Math.floor(ppos.y))

		if(gridPos.x == game.grid.width) gridPos.x = game.grid.width-1
		if(gridPos.y == game.grid.height) gridPos.y = game.grid.height-1

		// if station location, return
		//console.log(game.station, gridPos)
		if(game.station.clone().subtract(gridPos).getMagnitude() == 0) return callback({status: "STATION_IN_THE_WAY"})

		// already holding something. Place track down
		if(player.holding) {

			let track = player.holding

			track.position = gridPos.clone()

			// if already a piece at that place, Switch
			if(game.grid.getTile(gridPos.x, gridPos.y) != 0) {
				let groundTile = game.grid.getTile(gridPos.x, gridPos.y)

				player.holding = groundTile

				game.grid.editTile(gridPos.x, gridPos.y, track)
				game.sendGridData()

				return
			}

			// put piece down
			game.grid.editTile(gridPos.x, gridPos.y, track)
			game.sendGridData()

			// empty player holding
			player.holding = 0
		}


		// holding nothing. Pick track up
		else {

			let track = game.grid.getTile(gridPos.x, gridPos.y)

			// if no track at current position, do nothing
			if(track == 0) return callback({status: 'NO_PIECE_ON_FLOOR'})

			// remove stationary piece 
			game.grid.editTile(gridPos.x, gridPos.y, 0)
			game.sendGridData()

			// put in players holding
			player.holding = track

		}



		callback({status: 'SUCCESS'})




	})
}