function drawGrid() {
	
	let ch = canvas.height
	let cw = canvas.width
	let grid = game.grid

	let gridPixelHeight = grid.height*100
	let leftoverHeight = ch-gridPixelHeight

	let gridPixelWidth = grid.width*100
	let leftoverWidth = cw-gridPixelWidth
	
	for(let x=0;x<grid.width;x++) {
		for(let y=0;y<grid.height;y++) {
			
			let object = grid.data[x][y]

			if(object == 0) continue

			let asset = assets.images.tracks[object.type]
			
			ctx.save()

			//ctx.fillStyle = 'rgb(255,255,255)'
			//ctx.fillRect(x*100, ch-(y*100), 100, 100)

			let xPos = (x*100) + leftoverWidth/2
			let yPos = (y*100) + leftoverHeight/2

			ctx.translate(xPos+50, yPos+50)
			ctx.rotate((object.rotation*90)*(Math.PI/180))
			ctx.drawImage(asset, -50, -50, 100, 100)

			ctx.restore()


		}
	}
}