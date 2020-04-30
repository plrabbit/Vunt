/**
 * Find an eligible node in a tree
 * @param {Array|Object} data Tree，e.g. {id:1, children:[{id:2}]}
 * @param {Boolean} isFindOne Decide if only find the first one
 * @param {Function} fn Finding callback, params: node;index in current child node;dataTree, returning true means the node is eligible
 * @param {string} [field=children] Children field name in tree
 * @returns {Array|Object} Return Object when "isFindOne" is true, and false will return an Array
 */
export function traverse (data = [], isFindOne, fn, field = 'children') {
  let result = []
  data = Array.isArray(data) ? data : [data]
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    const checked = fn(item, i, data)
    const children = item[field]
    if (checked) {
      result.push(item)
      if (isFindOne) break
    }
    if (children) {
      const child = traverse(children, isFindOne, fn, field)
      if (child) result = result.concat(child)
    }
  }
  return isFindOne ? result[0] || null : result
}

/**
 * Find path in a tree
 * @param {Array|Object} data Tree, e.g. {id:1, children:[{id:2}]}
 * @param {Function} fn Finding callback, params: node;index in current child node;dataTree, returning true means the node is eligible
 * @param {string} [field=children] Children field name in tree
 * @return {Array}
 */
export function findPath (data, fn, field = 'children') {
  const path = []

  function find (array, parent) {
    parent && path.push(parent)
    for (let i = 0, len = array.length; i < len; i++) {
      const item = array[i]
      const checked = fn(item, i, array)
      const children = item[field]
      if (checked) {
        path.push(item)
        return true
      }
      if (children && children.length > 0) {
        if (find(children, item)) {
          return true
        } else {
          path.pop()
        }
      }
    }
  }

  find([].concat(data))
  return path
}
