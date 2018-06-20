const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  console.log(2121, user)
  if (user.username === 'Jane' && user.password === '123456') {
    ctx.session.user = {
      username: 'Jane'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'Jane'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password is error'
    }
  }
})

module.exports = userRouter
