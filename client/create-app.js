/*
* index.js
* 项目入口文件
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// 服务端跟随路由去渲染title,meta等头部标签信息，如此就可以在app.vue文件里申明一些metaInfo，子meta会覆盖父meta
import Meta from 'vue-meta'
import App from './app.vue'

// 引入全局CSS样式
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

import Notification from './components/notification'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)

// // 在body下创建一个根节点
// 在服务端渲染时没有ducument
// const root = document.createElement('div')
// document.body.appendChild(root)

// 此文件与index.js的区别就是在这儿，每次都是返回一个新的函数实例
export default () => {
  const router = createRouter()
  const store = createStore()
  // 将根节点root注入到app.vue组件中
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}
