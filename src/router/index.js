import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/samples',
      name: 'samples',
      meta: {
        title: '基础组件',
        description: '框架基础组件'
      },
      children: [
        {
          path: 'scale-screen',
          name: 'scaleScreen',
          component: () => import('@/samples/ScaleScreenView.vue'),
          meta: {
            title: '外层容器',
            description: '适配屏幕'
          }
        }
      ]
    }
  ]
})

export default router
