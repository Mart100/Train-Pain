class Grid {
	constructor(gridData) {
		this.data = gridData.data

		this.width = this.data.length

		if(this.width) this.height = this.data[0].length
		else this.height = 0

	}
}