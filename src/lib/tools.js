// 工具方法

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 * @return {Boolean}
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 * @return {Boolean|Number}
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @description 数组去重
 * @param arr
 * @return {[*]}
 */
export function unique (arr) {
  return [...new Set(arr)]
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * @description 检查值是否为null或undefined
 * @return { Boolean }
 */
export function isNil (value) {
  return value == null
}

// 函数去抖（连续事件触发结束后只触发一次）
// sample 1: _.debounce(function(){}, 1000)
// 连续事件结束后的 1000ms 后触发
// sample 1: _.debounce(function(){}, 1000, true)
// 连续事件触发后立即触发（此时会忽略第二个参数）
export function debounce (func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function () {
    var last = Date.now() - timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) { context = args = null }
      }
    }
  }

  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    var callNow = immediate && !timeout

    if (!timeout) {
      timeout = setTimeout(later, wait)
    }

    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 函数节流（如果有连续事件响应，则每间隔一定时间段触发）
// 每间隔 wait(Number) milliseconds 触发一次 func 方法
// 如果 options 参数传入 {leading: false}
// 那么不会马上触发（等待 wait milliseconds 后第一次触发 func）
// 如果 options 参数传入 {trailing: false}
// 那么最后一次回调不会被触发
// **Notice: options 不能同时设置 leading 和 trailing 为 false**
// 示例：
// var throttled = _.throttle(updatePosition, 100);
// $(window).scroll(throttled);
// 调用方式（注意看 A 和 B console.log 打印的位置）：
// _.throttle(function, wait, [options])
// sample 1: _.throttle(function(){}, 1000)
// print: A, B, B, B ...
// sample 2: _.throttle(function(){}, 1000, {leading: false})
// print: B, B, B, B ...
// sample 3: _.throttle(function(){}, 1000, {trailing: false})
// print: A, A, A, A ...
export function throttle (func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0

  if (!options) { options = {} }

  var later = function () {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) { context = args = null }
  }

  return function () {
    var now = Date.now()
    if (!previous && options.leading === false) { previous = now }

    var remaining = wait - (now - previous)
    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) { context = args = null }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}

export function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

export function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}
