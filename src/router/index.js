import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import TimeClock from '@/components/TimeClock'
import Reports from '@/components/Reports'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/clock',
      name: 'TimeClock',
      component: TimeClock,
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ]
})
