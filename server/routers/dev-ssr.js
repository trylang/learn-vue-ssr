const Router = require('koa-router')
const axios = require('axios')

// memory-fs读取文件是写入内存里，而是磁盘上，如果是写入磁盘。会出现文件夹。
// 写入磁盘的过程耗时长，且效率低。
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 输出目录是在mfs里

let bundle // 记录webpack每次打包生成的新的文件


