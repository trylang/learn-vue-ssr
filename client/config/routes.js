// import 写在路由里，就可以实现按需加载，但是需要安装插件，`npm i babel-plugin-syntax-dynamic-import -D`, 并且需要在.babelrc文件中添加此插件
// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [{
  path: '/',
  redirect: '/app'
}, {
  path: '/app',
  component: () => import('../views/todo/todo.vue')
  // 用createRender方法，就需要异步改同步
  // component: Todo
}, {
  path: '/login',
  component: () => import('../views/login/login.vue')
  // component: Login
}]
