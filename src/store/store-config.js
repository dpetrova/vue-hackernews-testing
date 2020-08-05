import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  items: [],
  item: null,
  comments: {},
  user: null
}

export default {
  state,
  getters,
  actions,
  mutations
}
