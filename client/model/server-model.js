// 服务端渲染数据，与client-model.js方法类似，于是想到server/db/db.js文件，
// 但是此文件返回的还是函数，不是数据对象，所以我们新创建server-model.js文件，
// 专门负责服务端返回获取数据

const config = require('../../app.config')
const createDb = require('../../server/db/db')

const db = createDb(config.db.appId, config.db.appKey)

export default {
  getAllTodos () {
    return db.getAllTodos()
  }
}
