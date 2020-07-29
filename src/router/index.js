import Vue from 'vue'
import VueRouter from 'vue-router'
import ItemList from '../views/ItemList.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'item-list',
    component: ItemList
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router