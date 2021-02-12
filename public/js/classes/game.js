
class Game {
	constructor(gameData) {
		this.id = gameData.id
		this.players = gameData.players
		this.trains = gameData.trains
		this.grid = new Grid(gameData.grid)
	}
}