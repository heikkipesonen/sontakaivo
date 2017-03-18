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

  chart (state, data) {
    console.log(data)
    console.log(state)
    state.chart = data
  }
}

export default mutations
