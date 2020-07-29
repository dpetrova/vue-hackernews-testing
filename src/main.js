import Vue from 'vue'
import App from './App.vue'
import ProgressBar from './components/ProgressBar'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

const bar = new Vue(ProgressBar).$mount() //create a mounted ProgressBar instance
Vue.prototype.$bar = bar //add the mounted progress bar to the base Vue constructor prototype, which will be available to child component instances
document.body.appendChild(bar.$el) //add the ProgressBar root element to the body

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
