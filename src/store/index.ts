import Vue from 'vue'
import Vuex from 'vuex'
import {R6Map} from '@/maps'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: null,
    layers: [],
  },
  mutations: {
    changeMap(state, payload){
      if(payload){
        state.map = payload;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
