import Vuex from 'vuex'
import defaultState from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

// mutations处理同步代码，使用commit触发；
// actions处理异步代码，使用dispatch触发；
export default () => {
  return new Vuex.Store({
    state: defaultState,
    getters,
    mutations,
    actions
  })
}
