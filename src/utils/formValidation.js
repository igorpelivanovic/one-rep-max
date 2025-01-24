const DEFAULT_MESSAGE = 'default message'

function required(msg = DEFAULT_MESSAGE) {
  return (val) => {
    if (val == null || val == undefined || (typeof val === 'string' && val.trim().length === 0))
      throw msg
    return true
  }
}

function email(msg = DEFAULT_MESSAGE) {
  return (val) => {
    if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(val)) throw msg
    return true
  }
}

function minLength({ msg = DEFAULT_MESSAGE, length }) {
  return (val) => {
    if (val.toString().length < length) throw msg
    return true
  }
}

function maxLength({ msg = DEFAULT_MESSAGE, length }) {
  return (val) => {
    if (val.toString().length > length) throw msg
    return true
  }
}

function pattern({ msg = DEFAULT_MESSAGE, regex }) {
  return (val) => {
    if (!regex.test(val)) throw msg
    return true
  }
}

function number(msg = DEFAULT_MESSAGE) {
  return (val) => {
    if (typeof val === 'string' && val.trim().length > 0) {
      val = +val
    }
    if (typeof val === 'number' && !isNaN(val)) return true
    throw msg
  }
}

function min(length, msg = DEFAULT_MESSAGE) {
  return (val) => {
    number(msg)(val)
    if (val < length) throw msg
    return true
  }
}

function max(length, msg = DEFAULT_MESSAGE) {
  return (val) => {
    number(msg)(val)
    if (val > length) throw msg
    return true
  }
}

function file(msg = DEFAULT_MESSAGE) {
  return (val) => {
    if (!!val && !(val instanceof File)) throw msg
    return true
  }
}

function image(params, msg = DEFAULT_MESSAGE) {
  return (val) => {
    file(msg)(val)
    if (params?.type) {
      fileExtension(params.type, msg)(val)
    }
    if (params?.size) {
      fileMaxSize(params.size, msg)(val)
    }
  }
}

function fileExtension(extensions, msg = DEFAULT_MESSAGE) {
  return (val) => {
    if (!!val && !extensions.includes(val.type)) throw msg
    return true
  }
}

function fileMaxSize(size, msg = DEFAULT_MESSAGE) {
  return (val) => {
    if (!!val && val.size / 1024 > size) throw msg
    return true
  }
}

export {
  required,
  email,
  minLength,
  maxLength,
  pattern,
  number,
  min,
  max,
  file,
  image,
  fileExtension,
  fileMaxSize,
}
