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
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        console.log('err', err)
        handleError(err)
      })
  },
  login ({commit}, {username, password}) {
    // 因为和页面有一个耦合的操作，接口调用成功之后要进行跳转操作。所以使用实例化promise，调用resolve和reject
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        })
        .catch(err => {
          handleError(err)
          reject(err)
        })
    })
  }
}
