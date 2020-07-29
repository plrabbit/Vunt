/**
 * Generating unique id(guid)
 * @returns {string} UID
 */
export const guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Get current browser
 * @returns {string} Browser name
 */
export const getCurrentBrowser = function () {
  const userAgent = navigator.userAgent
  const isOpera = userAgent.indexOf('Opera') > -1
  const isIE = userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 && !isOpera
  const isEdge = userAgent.indexOf('Edge') > -1
  const isFF = userAgent.indexOf('Firefox') > -1
  const isSafari = userAgent.indexOf('Safari') > -1 &&
    userAgent.indexOf('Chrome') === -1
  const isChrome = userAgent.indexOf('Chrome') > -1 &&
    userAgent.indexOf('Safari') > -1

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp.$1)
    if (fIEVersion === 7) {
      return 'IE7'
    } else if (fIEVersion === 8) {
      return 'IE8'
    } else if (fIEVersion === 9) {
      return 'IE9'
    } else if (fIEVersion === 10) {
      return 'IE10'
    } else if (fIEVersion === 11) {
      return 'IE11'
    } else {
      return '0'
    }
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isEdge) {
    return 'Edge'
  }
  if (isFF) {
    return 'FF'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
}
