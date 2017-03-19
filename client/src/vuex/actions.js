import api from '../api'

const actions = {
  getStatus ({commit}) {
    return api.get('/status').then((data) => {
      commit('status', data)
      return data
    })
  }
  /**
   * [actionName description]
   * @param  {[type]} {commit} [description]
   * @param  {[type]} payload  [description]
   * @return {[type]}          [description]
   *
   * actionName ({commit}, payload) {
   *    commit('mutationName', payload)
   * }
   */
}

export default actions
