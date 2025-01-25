const useLocalStorage = (key) => {
  const setValue = (val) => {
    localStorage.setItem(key, val)
    return val
  }
  const value = localStorage.getItem(key)

  return { setValue, value }
}

export { useLocalStorage }
