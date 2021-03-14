
socket.on('powerups', (response) => {
	let powerups = response.powerups
	game.powerups = []

	for(let powerupData of powerups) {
		let powerups = new Powerup(powerupData)
		game.powerups.push(powerups)
	}
})