// Variables
const games = []

// init project
const express = require('express')
const Socket = require('socket.io')
const fs = require('fs')
const app = express()

// require scripts
const utils = require('./js/utils.js')
const Game = require('./js/game.js')
const socketReceiver = require('./js/socketReceiver.js')

// redirect to client
app.use('/', express.static('public'))

app.use('/:id', express.static('public'))

// listen on port :)
const server = app.listen(process.env.PORT || 3333, () => {
  console.log('Your app is listening on port ' + server.address().port)
})

// io
const io = Socket(server)

// on player connect
io.on('connection', async (socket) => {
	socketReceiver(socket, games)
})