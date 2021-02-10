const utils = require('./utils.js')
const Game = require('./game.js')

module.exports = 
function socketReceiver(socket) {
	socket.on('newGame', (data, callback) => {
		let id = utils.randomToken(6)
		let game = new Game(id)
		callback({status: 'SUCCESS', gameData:game})
	})

}