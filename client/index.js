/*
* index.js
* 项目入口文件
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

// 引入全局CSS样式
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 在body下创建一个根节点
const root = document.createElement('div')
document.body.appendChild(root)

// 将根节点root注入到app.vue组件中
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
