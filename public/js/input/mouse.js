$(() => {

	$(document).on('mousemove', (event) => {
		mousePos = new Vector(event.clientX, event.clientY)
	})
	
	$(document).on('mousedown', (event) => {

		if(event.which == 1) { // left button
			if(game == undefined) return
			socket.emit('PICKUP_OR_PLACE_TRACK', {gameID: game.id}, (response) => {
				//console.log('PICKUP_OR_PLACE_TRACK, ', response)
			})
		}

		if(event.which == 2) { // right click

		}



	})
})