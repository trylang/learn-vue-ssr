import axios from 'axios'
import { createError } from './util'

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request
      .then(resp => {
        const data = resp.data
        if (!data) {
          return reject(createError(400, 'no data'))
        }
        if (!data.success) {
          return reject(createError(400, data.message))
        }
        resolve(data.data)
      })
      .catch(err => {
        const resp = err.response
        console.log('--------323232----', resp)
        if (resp.status === 401) {
          reject(createError(401, 'need auth'))
        }
      })
  })
}

const request = axios.create({
  baseURL: '/' // 因为是给自己得服务发请求，本地请求，所以不需要指定路径
})

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', { username, password }))
  },
  createTodo (todo) {
    return handleRequest(request.post(`/api/todo`, todo))
  },
  updataTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post(`/api/delete/completed`, {ids}))
  }
}
