const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html' // 指定ctx的文件输出格式是html

  // 因为服务端渲染就没有登录这个接口，所以需要在ctx中获取用户信息
  // 用在server-entry.js中让context有user值
  const context = {url: ctx.path, user: ctx.session.user}

  try {
    // const appString = await renderer.renderToString(context)
    const app = await bundle(context)

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    // renderToString 最耗资源，需要重新渲染页面，所有将跳转页面的判断放在上面
    const appString = await renderer.renderToString(app, context)

    const { title } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState() // 可以将store中的state值放到renderState函数中
    })

    ctx.body = html
  } catch (err) {
    console.log(err)
    throw err
  }
}
