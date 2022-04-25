import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersist from "vuex-persist"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myToken:''
  },
  getters: {
    
  },
  mutations: {
    initToken(state,val){
      state.myToken = val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    new vuexPersist({
      Storage: window.localStorage
    }).plugin
  ]
})
