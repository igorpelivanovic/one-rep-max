function required(msg = 'default message') {
  return (val) => {
    if (val == null || val == undefined || (typeof val == 'string' && val.trim().length == 0))
      throw msg
    return true
  }
}

function email(msg = 'default message') {
  return (val) => {
    if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(val)) throw msg
  }
}

export { required, email }
