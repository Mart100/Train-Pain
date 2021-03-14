let assets = {
  images: {
    ground: {
      grass1: 'assets/ground/grass1.png',
      grass2: 'assets/ground/grass2.png',
    },
    powerups: {
      rail: 'assets/powerups/rail.png',
      score: 'assets/powerups/score.png'
    },
    tracks: {
      1: 'assets/tracks/1.png',
      2: 'assets/tracks/2.png',
      3: 'assets/tracks/3.png',
      4: 'assets/tracks/4.png',
    },
    player: {
      right: 'assets/player/right.png',
      left: 'assets/player/left.png',
      up: 'assets/player/up.png',
      down: 'assets/player/down.png'
    },
  },
  sounds: {
    example: './assets/sounds/example.mp3',
  }
}

loopAssetsChildren(assets, [], {})

function loopAssetsChildren(obj, keys) {
  for(let obj1key in obj) {
    let obj1 = obj[obj1key]
    let newKeys = [...keys, obj1key]
    if(typeof obj1 == 'object') {
      loopAssetsChildren(obj1, newKeys)
    }
    else if(typeof obj1 == 'string') {
      let res = ''
      if(obj1.endsWith('.png') || obj1.endsWith('.jpg')) {
        let img = new Image()
        img.src = obj1
        res = img
      }
      if(obj1.endsWith('.webm') || obj1.endsWith('.wav') || obj1.endsWith('.mp3')) {
        let howl = new Howl({ src: obj1 })
        res = howl
      }
      let evaltxt = ''
      for(let i=0;i<newKeys.length;i++) evaltxt += `['${newKeys[i]}']`
      eval(`assets${evaltxt} = res`)
    }
  }
}