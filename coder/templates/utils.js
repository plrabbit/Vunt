exports.validateName = function (name) {
  return /^[a-zA-Z$_][a-zA-Z\d_]*$/.test(name)
}

exports.handleDuplicatedFunctionName = function (ctx) {
  const obj = {}
  for (const n of ctx.values()) {
    if (obj[n] === undefined) {
      obj[n] = ''
    } else {
      throw new Error(`Duplicated function name: ${n}`)
    }
  }
}

exports.handleDuplicatedPathParams = function (pathParams, funcName) {
  const pathSet = new Set(pathParams)
  if (pathSet.size !== pathParams.length) {
    throw new Error('Duplicated params in \'' + funcName + '\' function.')
  }
}

exports.getPathParams = function (path) {
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
