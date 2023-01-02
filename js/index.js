const form = document.querySelector('form')
const $url = document.querySelector('.url')
const $trends = document.getElementById('trends')
const $trendsAnchor = document.querySelector('.trends-anchor')

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
} else {
  document.documentElement.setAttribute('data-bs-theme', theme)
}

for (const el of form.elements) {
  el.addEventListener('change', generate)
}

const COLORS = `#0d6efd
#6610f2
#6f42c1
#d63384
#dc3545
#fd7e14
#ffc107
#198754
#20c997
#0dcaf0`

function generate() {
  const url = new URL(location)
  url.pathname = '/trends/'

  if (form.elements.allowUnsafeHTML.checked) url.searchParams.set('allowUnsafeHTML', '1')
  if (form.elements.dontShrinkText.checked) url.searchParams.set('dontShrinkText', '1')
  if (form.elements.showBorder.checked) url.searchParams.set('showBorder', '1')
  if (form.elements.colors.value !== COLORS)
    url.searchParams.set('colors', form.elements.colors.value.split('\n').join(','))
  if (form.elements.gridColumns.value !== '5')
    url.searchParams.set('gridColumns', form.elements.gridColumns.value)
  if (form.elements.gridRows.value !== '5')
    url.searchParams.set('gridRows', form.elements.gridRows.value)
  if (form.elements.maxFontSize.value !== '32')
    url.searchParams.set('maxFontSize', form.elements.maxFontSize.value)
  if (form.elements.minTime.value !== '5')
    url.searchParams.set('minTime', Number(form.elements.minTime.value) * 1000)
  if (form.elements.maxTime.value !== '15')
    url.searchParams.set('maxTime', Number(form.elements.maxTime.value) * 1000)
  if (form.elements.refreshTime.value !== '5')
    url.searchParams.set('refreshTime', Number(form.elements.refreshTime.value) * 1000)
  if (form.elements.trends.value !== '')
    url.searchParams.set('trends', form.elements.trends.value.split('\n').join(','))

  if (
    !form.elements.back.checked ||
    !form.elements.bottom.checked ||
    !form.elements.left.checked ||
    !form.elements.right.checked ||
    !form.elements.top.checked
  ) {
    const animations = []
    if (form.elements.back.checked) animations.push('back')
    if (form.elements.bottom.checked) animations.push('bottom')
    if (form.elements.left.checked) animations.push('left')
    if (form.elements.right.checked) animations.push('right')
    if (form.elements.top.checked) animations.push('top')
    url.searchParams.set('animations', animations.join(','))
  }

  $url.innerText = url.toString()
  $trends.src = url.toString()
  $trendsAnchor.href = url.toString()
}

generate()
