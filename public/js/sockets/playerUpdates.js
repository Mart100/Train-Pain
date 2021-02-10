
socket.on('players', (response) => {
	let players = response.players
	game.players = []

	for(let playerData of players) {
		let player = new Player(playerData)
		game.players.push(player)
		if(player.id == socket.id) selfPlayer = player
	}
})