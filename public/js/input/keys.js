$(() => {
	// keyboard
	$(document).on('keydown', (event) => { keys[event.keyCode] = true })
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })
	
})