$(() => {

	$(document).on('mousedown', () => {

		if(game == undefined) return
		socket.emit('PICKUP_OR_PLACE_TRACK', {gameID: game.id}, (response) => {
			//console.log('PICKUP_OR_PLACE_TRACK, ', response)
		})


	})
})