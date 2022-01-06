import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () => import(/* webpackChunkName: "HelloWorld" */ '@/components/HelloWorld.vue')
    },
    { path: '/', redirect: { name: 'HelloWorld' } }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router