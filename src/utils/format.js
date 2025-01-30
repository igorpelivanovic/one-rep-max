function number(val) {
  return new Intl.NumberFormat().format(val)
}

function fancyNumber(val) {
  if (val < 1e3) return { value: val, unit: '' }
  if (val >= 1e3 && val < 1e6) return { value: parseInt((val / 1e3).toFixed(1)), unit: 'K' }
  if (val >= 1e6 && val < 1e9) return { value: parseInt((val / 1e6).toFixed(1)), unit: 'M' }
  if (val >= 1e9 && val < 1e12) return { value: parseInt((val / 1e9).toFixed(1)), unit: 'B' }
  return { value: parseInt((val / 1e12).toFixed(1)), unit: 'T' }
}

export default { number, fancyNumber }
