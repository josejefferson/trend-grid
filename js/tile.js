import { randomInt, randomItem } from '/js/helpers.js'
import options from '/js/options.js'
const { colors, animations, minTime, maxTime, maxFontSize, allowUnsafeHTML, dontShrinkText } =
  options

export default class Tile {
  constructor() {
    this.currentSide = 'current'
    this.element = document.createElement('div')
    this.element.classList.add('card')
    this.cardInnerElement = document.createElement('div')
    this.cardInnerElement.classList.add('card-inner')
    this.trendCurrentElement = document.createElement('div')
    this.trendCurrentElement.classList.add('trend', 'trend-current')
    this.trendNextElement = document.createElement('div')
    this.trendNextElement.classList.add('trend', 'trend-next')
    this.cardInnerElement.append(this.trendCurrentElement, this.trendNextElement)
    this.element.appendChild(this.cardInnerElement)
    setTimeout(this.nextTrend.bind(this), randomInt(minTime, maxTime))
  }

  nextTrend() {
    this.element.classList.add('show-next')
    this.currentSide = 'next'
    this.randomize('next')
    setTimeout(this.prevTrend.bind(this), randomInt(minTime, maxTime))
  }

  prevTrend() {
    this.element.classList.remove('show-next')
    this.currentSide = 'current'
    this.randomize('current')
    setTimeout(this.nextTrend.bind(this), randomInt(minTime, maxTime))
  }

  render() {
    this.element.classList.remove(...animations.map((p) => 'position-' + p))
    this.element.classList.add('position-' + this.position)
    if (allowUnsafeHTML) {
      this.trendCurrentElement.innerHTML = this.currentMessage
      this.trendNextElement.innerHTML = this.nextMessage
    } else {
      this.trendCurrentElement.innerText = this.currentMessage
      this.trendNextElement.innerText = this.nextMessage
    }
    this.trendCurrentElement.style.backgroundColor = this.currentColor
    this.trendNextElement.style.backgroundColor = this.nextColor
    this.trendCurrentElement.style.fontSize = maxFontSize + 'px'

    if (dontShrinkText) return
    let i

    i = maxFontSize % 2 === 0 ? maxFontSize - 1 : maxFontSize
    while (this.trendCurrentElement.scrollHeight > this.trendCurrentElement.clientHeight && i > 0) {
      this.trendCurrentElement.style.fontSize = (i -= 2) + 'px'
    }

    i = maxFontSize % 2 === 0 ? maxFontSize - 1 : maxFontSize
    while (this.trendCurrentElement.scrollWidth > this.trendCurrentElement.clientWidth && i > 0) {
      this.trendCurrentElement.style.fontSize = (i -= 2) + 'px'
    }

    i = maxFontSize % 2 === 0 ? maxFontSize - 1 : maxFontSize
    while (this.trendNextElement.scrollHeight > this.trendNextElement.clientHeight && i > 0) {
      this.trendNextElement.style.fontSize = (i -= 2) + 'px'
    }

    i = maxFontSize % 2 === 0 ? maxFontSize - 1 : maxFontSize
    while (this.trendNextElement.scrollWidth > this.trendNextElement.clientWidth && i > 0) {
      this.trendNextElement.style.fontSize = (i -= 2) + 'px'
    }
  }

  randomize(trend) {
    if (trend === 'next' || !trend) {
      this.position = randomItem(animations)
    }

    if (trend === 'next') {
      this.nextColor = randomItem(colors)
      this.nextMessage = randomItem(options.trends)
    }
    if (trend === 'current' || !trend) {
      this.currentColor = randomItem(colors)
      this.currentMessage = randomItem(options.trends)
    }

    this.render()
  }
}
