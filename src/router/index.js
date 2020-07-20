import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Share from '../views/Share.vue'
import Profile from '../views/Profile.vue'
import Top from '../views/Top.vue'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
