module.exports = 
function tick(game) {

	// get filtered players
	let filteredPlayers4Client = []
	for(let player of game.players) {

		let playerObj4Client = {
			username: player.username,
			id: player.id,
			position: player.position,
			holding: player.holding
		}
		filteredPlayers4Client.push(playerObj4Client)
	}

	// send players
	for(let player of game.players) {

		player.socket.emit('players', {players: filteredPlayers4Client, status: 'SUCCESS'})
	}
}