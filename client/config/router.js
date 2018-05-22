import Router from 'vue-router'

import routes from './routes'

// 每次都返回一个路由实例，避免服务端渲染时内存溢出
export default () => {
  return new Router({
    routes,
    mode: 'history',
    base: '/base/',
    linkActiveClass: 'active-link', // 路径模糊匹配
    linkExactActiveClass: 'exact-active-link', // 路径精准匹配
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    fallback: true,
    parseQueryq (query) {},
    stringifyQuery (obj) {}
  })
}
