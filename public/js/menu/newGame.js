
$(() => {
	$('#menu button.newgame').on('click', () => {
		let username = $('#menu input.username').val()
		console.log(username)

		socket.emit('newGame', {}, (response) => {
			if(response.status == 'SUCCESS') {
				let game = new Game(response.gameData)
				console.log('YEEE', game)

			}
			
		})
	})
})