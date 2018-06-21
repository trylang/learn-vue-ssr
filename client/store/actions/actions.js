import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  // 处理错误信息
  if (err.code === 401) {
    notify({
      content: '请先登录！'
    })
    bus.$emit('auth') // 在client-entry.js中进行监听，因为那文件中有create-app进行vue-router初始化
  }
}

export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  },
  fetchTodos ({commit}) {
    commit('startLoading')
    model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        console.log('err', err)
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({commit}, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '又多了一件事情要做'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updataTodo ({commit}, {id, todo}) {
    commit('startLoading')
    model.updataTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('updataTodo', {id, todo: data})
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo ({commit}, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        notify({
          content: '又少了一件事情要做'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteAllCompleted ({commit, state}) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        commit('endLoading')
        notify({
          content: '清理一下~~~'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  login ({commit}, {username, password}) {
    // 因为和页面有一个耦合的操作，接口调用成功之后要进行跳转操作。所以使用实例化promise，调用resolve和reject
    return new Promise((resolve, reject) => {
      commit('startLoading')
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
          commit('endLoading')
        })
        .catch(err => {
          handleError(err)
          reject(err)
          commit('endLoading')
        })
    })
  }
}
