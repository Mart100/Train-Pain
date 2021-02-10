function drawGrid() {

	let ch = canvas.height
	let cw = canvas.width

	// draw horizontal lines
	ctx.strokeStyle = 'rgb(255,255,255)'
	for(let y=0;y<Math.ceil(ch/100);y++) {
		ctx.beginPath()
		ctx.moveTo(0, ch-y*100)
		ctx.lineTo(cw, ch-y*100)
		ctx.stroke()
	}

	// draw vertical lines
	for(let x=0;x<Math.ceil(cw/100);x++) {
		ctx.strokeStyle = 'rgb(255,255,255)'
		ctx.beginPath()
		ctx.moveTo(x*100, 0)
		ctx.lineTo(x*100, ch)
		ctx.stroke()
	}
}