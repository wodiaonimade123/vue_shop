import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersist from "vuex-persist"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myToken:'',
    menuData:[]
  },
  getters: {
    
  },
  mutations: {
    initToken(state,val){
      state.myToken = val.token
      console.log(state.myToken);
    },
    initmenuData(state,val){
      state.menuData = val
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
