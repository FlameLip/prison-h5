/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/index'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/policy',
    component: () => import('@/views/policy'),
    meta: {
      title: '会见须知',
      keepAlive: false
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录页',
      keepAlive: false
    }
  },
  {
    path: '/list',
    component: () => import('@/views/list'),
    meta: {
      title: '列表页',
      keepAlive: false
    }
  },
  {
    path: '/bind',
    component: () => import('@/views/bind'),
    meta: {
      title: '绑定亲属',
      keepAlive: false
    }
  },
  {
    path: '/apply',
    component: () => import('@/views/apply'),
    meta: {
      title: '申请页',
      keepAlive: false
    }
  },
  {
    path: '/time',
    component: () => import('@/views/time'),
    meta: {
      title: '会见时间',
      keepAlive: false
    }
  },
  {
    path: '/success',
    component: () => import('@/views/success'),
    meta: {
      title: '成功页',
      keepAlive: false
    }
  }
]
