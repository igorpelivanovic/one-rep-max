function clearObject(obj) {
  Object.keys(obj).forEach((key) => {
    delete obj[key]
  })
}

export default clearObject
