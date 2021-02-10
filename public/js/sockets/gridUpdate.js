
socket.on('grid', (response) => {
	let gridData = response.grid

	game.grid = new Grid(gridData)
})