let processInterval

function startProcess() {
	processInterval = setInterval(() => {
		tick()
	}, 25)
}

function tick() {

	movementTick()


	// resize canvas
	canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}