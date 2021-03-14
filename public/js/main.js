let canvas, ctx
let selfPlayer
let game
let keys = {}
let mousePos = new Vector(0, 0)


$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

})

function startGame() {

	// start drawing and processing
	frame()
	startProcess()

	// set game ID in url
	history.replaceState(game.id, '', `/${game.id}/`)    
}