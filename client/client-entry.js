// 由于客户端是使用index.js启动，而index.js不依赖create-app.js,
// 这时就需要建立这个文件去连接这俩文件。路由和metaInfo等头信息配对。
// 在webpack.config.base.js文件中，entry将之前的'../client/index.js'匹配成path.join(__dirname, '../client/client-entry.js),
// 在webpack.config.client.js文件中，else分支中entry同样将之前的index.js改成client-entry.js

import createApp from './create-app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#root')
})
