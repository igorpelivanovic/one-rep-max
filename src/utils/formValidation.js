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
    return true
  }
}

function minLength({ msg = 'default message', length }) {
  return (val) => {
    if (val.toString().length < length) throw msg
    return true
  }
}

function maxLength({ msg = 'default message', length }) {
  return (val) => {
    if (val.toString().length > length) throw msg
    return true
  }
}

function pattern({ msg = 'default message', regex }) {
  return (val) => {
    if (!regex.test(val)) throw msg
    return true
  }
}

export { required, email, minLength, maxLength, pattern }
