const options = {
  trends: [''],
  colors: [
    '#0d6efd',
    '#6610f2',
    '#6f42c1',
    '#d63384',
    '#dc3545',
    '#fd7e14',
    '#ffc107',
    '#198754',
    '#20c997',
    '#0dcaf0'
  ],
  animations: ['top', 'bottom', 'left', 'right', 'back'],
  minTime: 5000,
  maxTime: 15000,
  maxFontSize: 32,
  gridColumns: 5,
  gridRows: 5,
  refreshTime: 5000,
  dontShrinkText: false,
  allowUnsafeHTML: false
}

window.options = options

const params = new URLSearchParams(location.search)

const trends = params.get('trends')
const colors = params.get('colors')
const animations = params.get('animations')
const minTime = params.get('minTime')
const maxTime = params.get('maxTime')
const maxFontSize = params.get('maxFontSize')
const gridColumns = params.get('gridColumns')
const gridRows = params.get('gridRows')
const refreshTime = params.get('refreshTime')
const showBorder = params.get('showBorder')
const dontShrinkText = params.get('dontShrinkText')
const allowUnsafeHTML = params.get('allowUnsafeHTML')

if (trends) options.trends = trends.split('|')
if (colors) options.colors = colors.split('|')
if (animations) options.animations = animations.split(',')
if (minTime) options.minTime = Number(minTime)
if (maxTime) options.maxTime = Number(maxTime)
if (maxFontSize) options.maxFontSize = Number(maxFontSize)
if (refreshTime) options.refreshTime = Number(refreshTime)
if (showBorder) document.body.classList.add('show-border')
if (dontShrinkText) options.dontShrinkText = true
if (allowUnsafeHTML) options.allowUnsafeHTML = true
if (gridColumns) {
  options.gridColumns = gridColumns
  document.body.style.setProperty('--grid-columns', gridColumns)
}
if (gridRows) {
  options.gridRows = gridRows
  document.body.style.setProperty('--grid-rows', gridRows)
}


export default options
