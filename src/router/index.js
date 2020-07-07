import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'

import HomeSignIn from '../views/HomeSignIn.vue'
import Share from '../views/Share.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/homesignin',
    name: 'HomeSignIn',
    component: HomeSignIn
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
