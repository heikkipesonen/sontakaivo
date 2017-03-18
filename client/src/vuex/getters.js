const getters = {
  /**
   * getter
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   * @example
   * getterName (state) {
   *  return state.something
   * }
   */

  chart (store) {
    return store.chart.rows
  }
}

export default getters
