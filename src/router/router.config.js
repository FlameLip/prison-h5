/*
 * @Descripttion:
 * @Version: 1.0
 * @Author: jianlvqi jianlvqi@jxcc.com
 * @Date: 2022-10-31 10:42:50
 */
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
    // children: [
    //   {
    //     path: '/home',
    //     name: 'Home',
    //     component: () => import('@/views/home/index'),
    //     meta: { title: '首页', keepAlive: false }
    //   },
    //   {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import('@/views/home/about'),
    //     meta: { title: '关于我', keepAlive: false }
    //   }
    // ]
  },
  {
    path: '/finish',
    component: () => import('@/views/finish'),
    meta: {
      title: '完成页',
      keepAlive: false
    }
  }
]
