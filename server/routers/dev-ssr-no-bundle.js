
// 第一步：改json为js文件；
// 第二步：改成createRenderer函数；

const Router = require('koa-router')
const path = require('path')
const axios = require('axios')

// memory-fs读取文件是写入内存里，而是磁盘上，如果是写入磁盘。会出现文件夹。
// 写入磁盘的过程耗时长，且效率低。
// const MemoryFS = require('memory-fs')
const fs = require('fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

// const NativeModule = require('module')
// const vm = require('vm')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
// const mfs = new MemoryFS()
// serverCompiler.outputFileSystem = mfs // 输出目录是在mfs里

let bundle // 记录webpack每次打包生成的新的文件
serverCompiler.watch({}, (err, stats) => { // 看webpack文档
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js' // VueServerPlugin默认生成文件路径名
  )

  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry.js').default
  // try {
  //   const m = { exports: {} }
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
  //   const wrapper = NativeModule.wrap(bundleStr)
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (err) {
  //   console.err('compile js error: ', err)
  // }
  // bundle 只是VueServerPlugin生成body里面得HTML代码，没有头和script标签，不构成完成得
  // HTML结构。这时就需要server.template.ejs模板帮忙构成完整HTML
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '请稍等。。。'
    return
  }

  const clientManifestResp = await axios.get(
    // 由VueClientPlugin生成
    'http://localhost:8888/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createRenderer({
      inject: false,
      clientManifest
    })
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
// 所有请求都通过handleSSR去处理
router.get('*', handleSSR)

module.exports = router
