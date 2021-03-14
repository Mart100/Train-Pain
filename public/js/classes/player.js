
class Player {
	constructor(playerData) {
		this.username = playerData.username
		this.id = playerData.id
		this.position = new Vector(playerData.position.x, playerData.position.y)
		this.holding = playerData.holding
	}
}