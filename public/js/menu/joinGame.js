
$(() => {
	$('#menu button.joingame').on('click', () => {
		let username = $('#menu input.username').val()
		let gameID = $('#menu input.gameid').val()

		// join game
		console.log(username, gameID)
		socket.emit('joinGame', {username, gameID}, (response) => {
			if(response.status == 'SUCCESS') {
				console.log(`JOINED GAME: ${gameID} WITH USERNAME: ${username}`)

				// create game class
				game = new Game(response.gameData)

				// remove menu, show canvas
				$('#menu').fadeOut()
				$('#canvas').fadeIn()

				// start game
				startGame()

				//console.log('YEEE', game)
			}
			
			// something went wrong...
			else {
				let error = response.status
				$('#menu').append(error)
			}
		})
	})
})