import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    value: "JavascriptValue",
  },
  mutations: {
    changeValue(state, value) {
      state.value = value
    },
  },
  actions: {
  },
  modules: {
  }
})
