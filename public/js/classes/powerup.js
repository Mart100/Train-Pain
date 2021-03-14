class Powerup {
	constructor(powerupData) {
		this.position = new Vector(powerupData.position.x, powerupData.position.y)
		this.type = powerupData.type // [rail, score]
	}
}