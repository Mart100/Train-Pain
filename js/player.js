const Vector = require('./vector.js')

module.exports =
class Player {
	constructor(socket) {
		this.username = ''
		this.id = ''
		this.socket
		this.position = new Vector()
		this.holding = 0 // Track
	}
}