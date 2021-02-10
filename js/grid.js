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
		this.data[x][y] = track
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