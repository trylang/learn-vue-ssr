// 由于客户端是使用index.js启动，而index.js不依赖create-app.js,
// 这时就需要建立这个文件去连接这俩文件。路由和metaInfo等头信息配对。
// 在webpack.config.base.js文件中，entry将之前的'../client/index.js'匹配成path.join(__dirname, '../client/client-entry.js),
// 在webpack.config.client.js文件中，else分支中entry同样将之前的index.js改成client-entry.js

import createApp from './create-app'
import bus from './util/bus'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) { // server-render.js中加的initalState属性，以及在server.template.ejs中生成出来的__INITIAL_STATE__
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('auth', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
