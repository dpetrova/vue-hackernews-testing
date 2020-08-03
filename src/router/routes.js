import ItemList from '../views/ItemList.vue'
import SignUp from '../views/SignUp.vue'

export default [
  {
    path: '/',
    redirect: '/top'
  },
  {
    path: '/:type(top|new|show|ask|job)/:page?',
    component: ItemList
  },
  {
    path: '/signup',
    component: SignUp
  }
]
