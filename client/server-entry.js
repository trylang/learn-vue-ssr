import createApp from './create-app'

// 这里的context指的是server-render.js中的context，因为渲染的内容可能会很多，
// 所以就需要使用new Promise异步来监听它什么时候渲染好了
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // user: ctx.session.user 用在todo.vue中判断是否有登录，store.user中，不然始终没值
    if (context.user) {
      store.state.user = context.user
    }

    // 这一步还没有真正的渲染，
    // 给路由推一条数据，服务端没有浏览器默认记录的路由，需要手动推一条。
    // 如此才会执行渲染这部分代码
    router.push(context.url)

    // onReady方法只会在服务端渲染时才会用到
    router.onReady(() => {
      // context.url路径下匹配到需要的组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }

      // 服务端渲染拿到组件中含有asyncData函数，执行进行渲染
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        console.log('222222222222', store.state)
        // 这里从app.$meta拿到route的meta信息，用于在server/server-render.js中使用,
        // 用于解决在server/server.template.ejs模板中固定title头信息
        context.meta = app.$meta()
        context.state = store.state // 要给context传state属性，在server-render.js中要用到 =》initalState: context.renderState()
        context.router = router
        resolve(app)
      })
    })
  })
}
