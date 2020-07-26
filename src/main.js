import Vue from 'vue'
import App from './App.vue'
import { fetchListData } from './api/api'

Vue.config.productionTip = false

function getTopItems() {
  return fetchListData('top').then(items => items)
}

getTopItems().then(items => {
  window.items = items
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})
