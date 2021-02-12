$(() => {

	$(document).on('mousedown', () => {

		socket.emit('PICKUP_OR_PLACE_TRACK', {gameID: game.id}, (response) => {
			console.log('PICKUP_OR_PLACE_TRACK, ', response)
		})


	})
})