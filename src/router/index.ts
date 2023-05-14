import { getToken } from '@/utils/local_'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// import Home from '@/views/Home.vue'
// import User from '@/views/User.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    meta: { requiresAuth: false },
    name: 'login',
    component: () => import('@/views/Login/index.vue')
    // children: [
    //     {
    //         name: 'loginc',
    //         path: '/loginc',
    //         component: () => import('@/views/Home.vue')
    //     }
    // ]
  },
  { path: '/index', meta: { requiresAuth: true }, name: 'home', component: () => import('@/views/Index/Home.vue') },
  { path: '/home', meta: { requiresAuth: true }, name: 'home', component: () => import('@/views/Index/Home.vue') },
  { path: '/user', meta: { requiresAuth: true }, name: 'user', component: () => import('@/views/User.vue') },
  { path: '/demo', meta: { requiresAuth: true }, name: 'user', component: () => import('@/views/Demo.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 全局前置导航守卫
// router.beforeEach((to, from, next) => {
//   // 如果用户访问登录页，直接放行
//   if (to.path === '/login') return next()
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 判断是否需要登录验证
//     const tokenStr = getToken()
//     if (tokenStr) return next()
//   }
//   next('/login')
// })

export default router
