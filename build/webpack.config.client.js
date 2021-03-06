const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

/** 新增项 */
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: '8888',
  host: '0.0.0.0',
  overlay: { // webpack编译出现错误，则显示到网页上
    errors: true
  },
  headers: {'Access-Control-Allow-Origin': '*'}, // 允许跨域 
  // open: true,
  // historyApiFallback 当vue-router配置mode为history时，用户手动刷新页面
  // 会报404，因为会请求服务端， 所以需要此配置项。 如果是前端跳转路由则没问题。
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  // 不刷新热加载数据
  hot: true
}

const definePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

let config

if (isDev) {
  // 开发坏境的配置
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          // 'style-loader',
          'vue-style-loader', // vue文件下写css进行热更新的功能
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     module: true,
          //     localIdentName: isDev?'[path]-[name]-[hash:base64:5]': '[hash:base64:5]',
          //   }
          // },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    plugins: definePlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 生成坏境的配置
  config = merge(baseConfig, {
    entry: { // 将所用到的类库单独打包
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/' // 静态资源以public开头
    },
    module: {
      rules: [{
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }]
    },
    plugins: definePlugins.concat([
      // webpack 4.5.0 不支持 extract-text-webpack-plugin 插件，换4.2.0版本以下
      // new ExtractPlugin('styles.[contentHash:8].css')
      // 把 contentHash] 换成  [chunkhash:8]
      new ExtractPlugin('styles.[chunkhash:8].css')

      // webpack4已废弃CommonsChunkPlugin
      // // 将类库文件单独打包出来
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor'
      // })

      // webpack相关的代码单独打包
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'runtime'
      // })
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {                  // 这里开始设置缓存的 chunks
          commons: {
            chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minSize: 0,             // 最小尺寸，默认0,
            minChunks: 2,           // 最小 chunk ，默认1
            maxInitialRequests: 5   // 最大初始化请求书，默认1
          },
          vendor: {
            test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
            chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
            priority: 10,           // 缓存组优先级
            enforce: true
          }
        }
      },
      runtimeChunk: true
    }
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
