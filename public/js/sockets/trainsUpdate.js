
socket.on('trains', (response) => {
	let trains = response.trains
	game.trains = []

	for(let trainData of trains) {
		let train = new Train(trainData)
		game.trains.push(train)
	}
})