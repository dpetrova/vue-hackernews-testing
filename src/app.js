import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'
import { yearMixin, HTTPStatusMixin } from './util/mixins'
import { timeAgo } from './util/filters'

//register mixin globally
Vue.mixin(yearMixin)
Vue.mixin(HTTPStatusMixin)

//register filter globally
Vue.filter('timeAgo', timeAgo)

// Expose a factory function that creates a fresh set of store, router, app instances
//on each call (which is called for each SSR request)
export function createApp() {
  Vue.use(Vuex)
  Vue.use(Router)

  const router = new Router(routerConfig)
  const store = new Vuex.Store(storeConfig)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
