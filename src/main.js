import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Router)
Vue.use(VueAxios, axios)

const store = new Vuex.Store(storeConfig)
const router = new Router(routerConfig)

sync(store, router) //sync vuex and vue-router (the store will include a route object)

const bar = new Vue(ProgressBar).$mount() //create a mounted ProgressBar instance
Vue.prototype.$bar = bar //add the mounted progress bar to the base Vue constructor prototype, which will be available to child component instances
document.body.appendChild(bar.$el) //add the ProgressBar root element to the body

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
