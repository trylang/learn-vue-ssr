const Router = require('koa-router')

// 只处理前缀是/api的路径
const apiRouter = new Router({prefix: '/api'})

const validataUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  .get('/todos', validataUser, async (ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', validataUser, async (ctx) => {
    const data = await ctx.db.updataTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async (ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/todo/completed', async (ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
