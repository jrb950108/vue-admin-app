import Main from '@/views/main'

/**
 * meta: {
 *  title: 标题
 *  icon: (-) 该页面在左侧菜单显示的图标
 * }
 */

// 初始路由表(无需权限)
export const initRouterMap = [
  {
    path: '',
    redirect: '/app'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login')
  }
]

// 主路由
export const initMainRouterMap = {
  path: '/app',
  name: 'app',
  component: Main,
  children: [

  ]
}

// 若写在initRouteMap中会造成应用初始化时就跳转404
// 单独抽离出来通过addRoutes添加到路由中
export const error404 = {
  path: '*',
  name: 'error-404',
  meta: {

  },
  component: () => import('@/views/error-page/404.vue')
}

// 需要权限访问的路由表
export const accessRouterMap = {
  'workbench': {
    path: 'workbench',
    name: 'workbench',
    meta: {
      title: '工作台'
    },
    component: () => import('@/views/workbench')
  },
  'e-commerce': {
    path: 'e-commerce',
    name: 'e-commerce',
    meta: {
      title: '电商保护'
    },
    component: () => import('@/views/e-commerce'),
    children: {
      'data-monitor': {
        path: 'data-monitor',
        name: 'data-monitor',
        meta: {
          title: '数据监测'
        },
        component: () => import('@/views/e-commerce/data-monitor')
      },
      'data-process': {
        path: 'data-process',
        name: 'data-process',
        meta: {
          title: '数据处理'
        },
        component: () => import('@/views/e-commerce/data-process')
      }
    }
  }
}
