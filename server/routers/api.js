const Router = require('koa-router')

// 只处理前缀是/api的路径
const apiRouter = new Router({prefix: '/api'})

module.exports = apiRouter
