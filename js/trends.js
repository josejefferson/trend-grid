import Tile from '/js/tile.js'
import options from '/js/options.js'
import { refreshData } from '/js/helpers.js'
const $grid = document.querySelector('.trends-grid')
const grid = options.gridColumns * options.gridRows

document.documentElement.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
})

const tiles = []
for (let i = 0; i < grid; i++) {
  const tile = new Tile()
  tiles.push(tile)
  $grid.appendChild(tile.element)
  tile.randomize()
}

refreshData().then(() => {
  tiles.forEach((tile) => tile.randomize())
})

setInterval(refreshData, options.refreshTime)
