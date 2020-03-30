exports.validateName = function (name) {
  return /^[a-zA-Z$_][a-zA-Z\d_]*$/.test(name)
}

exports.validateMethod = function (method) {
  if (typeof method !== 'string') return false
  return /^(get|post|put|patch|delete|head)$/.test(method.toLowerCase())
}

exports.validateDuplicatedPathParams = function (pathParams) {
  return new Set(pathParams).size === pathParams.length
}

exports.getPathParams = function (path) {
  if (typeof path !== 'string') return false
  const reg = /\/(?::(\w+))(?=\/|$)|\/(?:{(\w+)})(?=\/|$)/g
  const pathParams = []
  let arrangedPath = path + ''
  while (true) {
    const str = reg.exec(path)
    if (str) {
      pathParams.push(str[1] ? str[1] : str[2])
      arrangedPath = arrangedPath.replace(str[1] ? new RegExp(`:${str[1]}`) : new RegExp(`{${str[2]}}`), '${' + (str[1] ? str[1] : str[2]) + '}')
    } else {
      break
    }
  }
  return { pathParams, arrangedPath }
}
