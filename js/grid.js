const Vector = require('./vector.js')

module.exports = 
class Grid {
	constructor(width, height) {
		this.data = []

		this.createEmtpyGridData(width, height)
	}

	get width() {
		return this.data.length
	}
	get height() {
		if(this.width) return this.data[0].length
		else return 0
	}

	editTile(x, y, track) {
		if(this.data[x] == undefined) return
		this.data[x][y] = track
	}

	getTile(x, y) {
		if(this.data[x] == undefined) return
		return this.data[x][y]
	}

	randomTile() {
		let pos = new Vector(Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height))
		let rail = this.getTile(pos.x, pos.y)
		return {pos, rail}
	}

	createEmtpyGridData(width, height) {
		for(let x=0;x<width;x++) {
			this.data[x] = []
			for(let y=0;y<height;y++) {
				this.data[x][y] = 0
			}
		}
	}
}