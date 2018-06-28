const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')

// 在使用createRender方式进行服务端渲染时就不需要'vue-ssr-server-bundle.json'文件，而是直接读取“server-entry.js”，也就不需要VueServerPlugin了。故注释掉
// 但是在正式环境还是需要VueServerPlugin，所以调用时判断一下
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  // new webpack.HotModuleReplacementPlugin(), 不需要
  // new webpack.NoEmitOnErrorsPlugin(), 不需要
  new ExtractPlugin('styles.[chunkhash:8].css'),
  new webpack.DefinePlugin({ // 有可能在文件中会用到这两个变量
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  })
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}

let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // export.module
    filename: 'server-entry.js', // 将node_modules里的依赖都打包到server-entery.js文件中
    path: path.join(__dirname, '../server-build')
  },
  // 因为在浏览器环境中不能使用require引入代码，但是现在在node端是可以直接用require引用node_module文件，所以在弄的环境去掉依赖项。
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    // rules: [
    //   {
    //     // 将css单独打包，这里不能使用style-loader，以为style-loader是将css用js引入dom插到HTML中的,
    //     // 而在node环境，是没有dom的执行环境，就会报错，所以就用vue-style-loader。
    //     test: /\.styl/,
    //     use: [
    //       'vue-style-loader',
    //       'css-loader',
    //       {
    //         loader: 'postcss-loader',
    //         options: {
    //           sourceMap: true
    //         }
    //       },
    //       'stylus-loader'
    //     ]
    //   }
    // ]
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
  // import Vue from 'vue'
  // resolve: { 不需要指定alias
  //   alias: {
  //     'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
  //   }
  // },
  plugins
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
