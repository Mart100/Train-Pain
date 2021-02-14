class Grid {
	constructor(gridData) {
		this.data = gridData.data

		this.width = this.data.length

		if(this.width) this.height = this.data[0].length
		else this.height = 0

	}
	getTile(x, y) {
		if(this.data[x] == undefined) return
		return this.data[x][y]
	}
}