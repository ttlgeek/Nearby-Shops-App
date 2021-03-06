import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Nearby from '@/components/Nearby'
import Preferred from '@/components/Preferred'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: Nearby
    },
    {
      path: '/preferred',
      name: 'preferred',
      component: Preferred
    }
  ]
})
