const state = {
  bigtitle: "",
  screenOne: null
}
//状态
const getters = {

}
//取值
const mutations = {
  setTitle(state, data) {
    state.bigtitle = data
  },
  setResid(state, data) {
    state.resid = data
  },
  setScreenOne(state, data) {
    state.screenOne = data
  }
}
// 方法
const actions = {
  SETTITLE(context, title) {
    context.commit('setTitle', title)
  },
  SETRESID(context, num) {
    context.commit('setResid', num)
  },
  //  储存第一屏配置信息
  SETONE(context, num) {
    context.commit('setScreenOne', num)
  }
}
// 异步方法
export default {
  namespaced: true,
  // 允许重命名
  state,
  getters,
  actions,
  mutations
}
