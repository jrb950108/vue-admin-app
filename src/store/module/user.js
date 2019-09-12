import router from '@/router'
import { login, getUserInfo } from '@/api/user'
import { accessRouterMap, initMainRouterMap, error404 } from '@/router/routes'
import { getToken, setToken, removeToken, routerGenerator } from '@/lib/util'

export default {
  state: {
    token: getToken(),
    // 是否获取过用户信息
    hasGetInfo: false,
    // 导航菜单
    navMenu: []
    // 侧边菜单
    // sideMenuMap: {}
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN (state) {
      state.token = null
      removeToken()
    },
    SET_HAS_GET_INFO (state, status) {
      state.hasGetInfo = status
    },
    SET_NAV_MENU (state, menu) {
      state.navMenu = menu
    }
    // SET_SIDE_MENU_MAP (state, data) {
    //   state.sideMenuMap = data
    // }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          if (res.status.code === '0') {
            let token = res.result.token
            commit('SET_TOKEN', token)
            resolve(res)
          } else {
            reject(res)
          }
          // if (res.status.code === '0') {
          //   const data = res.result
          //   commit('setToken', data.authToken)
          //   commit('setUserInfo', data)
          // }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // 无需请求接口退出登录
        commit('REMOVE_TOKEN')
        commit('SET_HAS_GET_INFO', false)
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          // console.log(res)
          if (res.status.code === '0') {
            let { routes } = res.result
            dispatch('generateRouter', { routes })
            commit('SET_HAS_GET_INFO', true)
            resolve(res)
          } else {
            commit('REMOVE_TOKEN')
            commit('SET_HAS_GET_INFO', false)
            reject(res)
          }
        }).catch(err => {
          commit('REMOVE_TOKEN')
          commit('SET_HAS_GET_INFO', false)
          reject(err)
        })
      })
    },
    // 根据返回数据生成路由表
    generateRouter ({ commit }, { routes }) {
      try {
        // 生成可访问的挂载路由
        let accessedRouter = routerGenerator(routes, accessRouterMap)
        // let sideMenuMap = sideMenuMapGenerator(accessedRouter)
        let fullMainRouterMap = {
          ...initMainRouterMap,
          redirect: { name: 'workbench' },
          children: initMainRouterMap.children.concat(accessedRouter)
        }
        commit('SET_NAV_MENU', accessedRouter)
        // commit('SET_SIDE_MENU_MAP', sideMenuMap)
        router.addRoutes([fullMainRouterMap, error404])
        console.log(accessedRouter)
      } catch (error) {
        console.error('生成挂载路由时异常')
        // 在生成挂载路由异常时 只添加初始主路由 防止页面白屏
        router.addRoutes([initMainRouterMap, error404])
      }
    }
  }
}
