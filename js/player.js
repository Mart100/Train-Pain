const Vector = require('./vector.js')

module.exports =
class Player {
	constructor() {
		this.username = ''
		this.id = ''
		this.position = new Vector()
	}
}