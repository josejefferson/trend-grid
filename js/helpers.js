import options from '/js/options.js'

export function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomItem(array) {
  if (array.length === 0) return undefined
  return array[randomInt(0, array.length - 1)]
}

export async function refreshData() {
  if (window.self !== window.top) {
    parent.postMessage(['fetch-trends'], '*')

    const { data } = await new Promise((resolve) => {
      window.addEventListener('message', resolve, { once: true })
    })

    if (!Array.isArray(data)) throw new Error('Invalid data')
    const [command, content] = data
    if (command !== 'data') throw new Error(`Invalid command "${command}"`)
    options.trends = content
  }
}
