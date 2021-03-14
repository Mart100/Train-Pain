$(() => {
	// keyboard
	$(document).on('keydown', (event) => { keys[event.keyCode] = true })
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })

	$(document).on('keypress', (event) => {

		console.log('1', event.keyCode)
		if(event.keyCode == 32) { // Spacebar

			console.log('2')

			let ppos = getPlayerScreenPosition(selfPlayer)
			
			let trainDistances = []
			for(let train of game.trains) {
				let trainPos = getPreciseTrainPositionOnScreen(train)

				let distance = ppos.clone().subtract(trainPos).getMagnitude()

				trainDistances.push([distance, train.id])
			}
			trainDistances.sort((a, b) => a[0]-b[0])

			let closestTrain = trainDistances[0]
			let trainID = closestTrain[1]

			console.log('3', trainDistances)
			console.log(closestTrain, ppos)

			if(closestTrain[0] < 50) {
				console.log('4')
				socket.emit('TRIGGER_TRAIN', {gameID: game.id, trainID}, (response) => {
					//console.log('PICKUP_OR_PLACE_TRACK, ', response)
				})
			}

			

		}

	})
	
})