const mutations = {
  /**
   * mutation
   * @param {object} state
   * @param {payload} payload
   * @example
   * setView (state, payload) {
   *  state.payload = payload
   * }
   */

  status (state, data) {
    state.status = data
  }
}

export default mutations
