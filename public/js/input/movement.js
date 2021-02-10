function movementTick() {
	let speed = 0.05 //(settings.playerSpeed/150)*(world.deltaTick/10)

	let movement = new Vector(0, 0)

	if(keys[87] || keys[38]) { // north
		movement.add(new Vector(0, -speed))
	}
	if(keys[68] || keys[39]) { // east
		movement.add(new Vector(speed, 0))
	}
	if(keys[83] || keys[40]) { // south
		movement.add(new Vector(0, speed))
	}
	if(keys[65] || keys[37]) { // west
		movement.add(new Vector(-speed, 0))
	}

	// moved
	if(movement.getMagnitude() > 0) {
		socket.emit('PLAYER_MOVEMENT', {movement, gameID: game.id})
	}
}