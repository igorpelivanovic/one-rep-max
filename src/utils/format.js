function number(val) {
  return new Intl.NumberFormat().format(val)
}

export default { number }
