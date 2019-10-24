import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'

export const LOCALE_KEY = 'locale'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return null
}

export function removeToken () {
  Cookies.remove(TOKEN_KEY)
}

export function saveLocale (value) {
  localStorage.setItem(LOCALE_KEY, value)
}

export function readLocale () {
  return localStorage.getItem(LOCALE_KEY) || null
}

export function hasChild (item) {
  return item.children && item.children.length !== 0
}

export function isObject (obj) {
  return obj != null && typeof obj === 'object' && Array.isArray(obj) === false
}

/**
 * @description 路由和导航菜单生成器 根据返回的数据生成路由表
 * @param { Array } data
 * @param { Object } map 前端路由配置数据
 * @return { Array } 可挂载的路由规则
 */
export function routerGenerator (data, map) {
  let routers = []
  data.forEach(item => {
    if (item.name in map) {
      let obj = {
        ...map[item.name],
        children: []
      }
      let childrenMap = map[item.name].children

      // 根据情况后端是否需要携带meta信息
      // let meta = map[item.name].meta
      // if (isObject(item.meta)) {
      //   obj.meta = Object.assign({}, meta, item.meta)
      // }

      if (hasChild(item) && isObject(childrenMap)) {
        obj.children = routerGenerator(item.children, childrenMap)
      }
      routers.push(obj)
    }
  })
  return routers
}

export function sideMenuMapGenerator (data) {
  let map = {}

  data.forEach(item => {
    map[item.name] = item.children
  })

  return map
}
