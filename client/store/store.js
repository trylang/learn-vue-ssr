import Vuex from 'vuex'
import defaultState from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'

export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters
  })
}
