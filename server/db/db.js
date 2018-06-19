const sha1 = require('sha1') // npm i sha1 -S 用于生成安装线上数据库APICloud签名
const axios = require('axios')

const className = 'todo' // 线上数据库的命名空间，知道操作哪个数据库

const request = axios.create({ // 参照文档https://docs.apicloud.com/Cloud-API/data-cloud-api
  baseURL: 'https://d.apicloud.com/mcm/api/'
})

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {

  }
}
