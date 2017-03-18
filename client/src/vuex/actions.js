import api from '../api'

const actions = {
  getChart ({commit}, chartType) {
    return api.get(`/${chartType}`).then((data) => {
      commit('chart', data)
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
