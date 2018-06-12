// 静态资源请求得中间件
const Router = require('koa-router')
const send = require('koa-send')

// prefix只处理以public开头的才处理
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
