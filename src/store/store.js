import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  eventAnalysisPname: window.sessionStorage.getItem('eventAnalysisPname')
}

const mutations = {
  storeEventAnalysisPname (state, payload) {
    state.eventAnalysisPname = payload.pname
    window.sessionStorage.setItem('eventAnalysisPname', payload.pname)
  },
  clearEventAnalysisPname (state) {
    state.eventAnalysisPname = null
    window.sessionStorage.removeItem('eventAnalysisPname')
  }
}

export default new Vuex.Store({
  state,
  mutations
})
