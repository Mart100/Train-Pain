function drawGrid() {
	
	let grid = game.grid
	let ch = canvas.height
	let cw = canvas.width
	
	for(let x=0;x<grid.width;x++) {
		for(let y=0;y<grid.height;y++) {
			
			let object = grid.data[x][y]

			if(object == 0) continue

			let asset = assets.images.tracks[object.type]

			if(Math.random() > 0.9999) console.log(asset, object)
			
			ctx.fillStyle = 'rgb(255,255,255)'
			ctx.fillRect(x*100, ch-(y*100), 100, 100)
			ctx.drawImage(asset, x*100, ch-(y*100), 100, 100)


		}
	}
}