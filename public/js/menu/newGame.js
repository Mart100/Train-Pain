
$(() => {
	$('#menu button.newgame').on('click', () => {
		let username = $('#menu input.username').val()
		console.log(username)

		socket.emit('newGame', {}, (response1) => {
			if(response1.status == 'SUCCESS') {

				// create game class
				game = new Game(response1.gameData)
				let gameID = game.id

				// join game
				console.log(username, gameID)
				socket.emit('joinGame', {username, gameID}, (response2) => {
					if(response2.status == 'SUCCESS') {
						console.log(`JOINED GAME: ${gameID} WITH USERNAME: ${username}`)

						// remove menu, show canvas
						$('#menu').fadeOut()
						$('#canvas').fadeIn()

						// start game
						startGame()
					}
				})



			}
			
		})
	})
})