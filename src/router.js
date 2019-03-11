import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Log from './views/Log.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'log',
      component: Log,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
