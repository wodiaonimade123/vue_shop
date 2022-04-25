import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from "axios";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = store.state.myToken
  return config
})
axios.interceptors.response.use(res => {
  return res
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
