import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '@/layout/index.vue'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/his',
    children: [{
      path: 'his',
      name: 'his',
      component: HomeView,
      meta: {
        title: 'xx医院实时监控平台'
      }
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
