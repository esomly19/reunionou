import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Event from '../components/Event.vue'
import LEvent from '../components/ListEvents.vue'
import Detail from '../components/Detail.vue'
import Participe from '../components/Participe.vue'
import Profil from '../components/profil.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/levent',
    name: 'Levent',
    component: LEvent
  },
  {
    path: '/event',
    name: 'Evenement',
    component: Event
  },
  {
    path: '/event/:token',
    name: 'detail',
    component: Detail
  },
  {
    path: '/evenement/:token',
    name: 'participe',
    component: Participe
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
