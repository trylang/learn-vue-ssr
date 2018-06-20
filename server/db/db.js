const sha1 = require('sha1') // npm i sha1 -S 用于生成安装线上数据库APICloud签名
const axios = require('axios')

const className = 'todo' // 线上数据库的命名空间，知道操作哪个数据库

const request = axios.create({ // 参照文档https://docs.apicloud.com/Cloud-API/data-cloud-api
  baseURL: 'https://d.apicloud.com/mcm/api/'
})

const createError = ({code, resp}) => {
  const err = new Error(resp.mesage)
  err.code = code
  return err
}

const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    return createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    }
  }
}
