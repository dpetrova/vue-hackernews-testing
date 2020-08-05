import ItemList from '../views/ItemList.vue'
import SignUp from '../views/SignUp.vue'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'

export default [
  {
    path: '/:type(top|new|show|ask|job)/:page?',
    component: ItemList
  },
  {
    path: '/',
    redirect: '/top'
  },
  {
    path: '/signup',
    component: SignUp
  },
  { path: '/item/:id(\\d+)', component: ItemView },
  { path: '/user/:id', component: UserView }
]
