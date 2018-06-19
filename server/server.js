const Koa = require('koa')

const send = require('koa-send') // koa-send 用于发送静态文件资源

const path = require('path')

const staticRouter = require('./routers/static')

const apiRouter = require('./routers/api')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'plesase try again later'
    }
  }
})

// 使用koa-send中间件，异步发送ico,否则就下一步next
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

// 先处理静态资源
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

// 处理以/api开头的路径
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

// 这里PORT，HOST参数位置不能变，会报错
app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
