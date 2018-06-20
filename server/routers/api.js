const Router = require('koa-router')

// 只处理前缀是/api的路径
const apiRouter = new Router({prefix: '/api'})

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todo', async (ctx) => {
  const todos = await ctx.db.getAllTodos()
  ctx.body = successResponse(todos)
})

module.exports = apiRouter
