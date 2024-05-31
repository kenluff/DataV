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
    },
    {
      path: '/three-base',
      name: 'ThreeBase',
      meta: {
        title: 'ThreeJs基础',
        description: 'ThreeJs基础'
      },
      children: [
        {
          path: 'base-case',
          name: 'BaseCase',
          component: () => import('@/views/three/base/BaseCaseView.vue'),
          meta: {
            title: '基础案例',
            description: 'ThreeJs基础案例'
          }
        },
        {
          path: 'base-init',
          name: 'baseInit',
          component: () => import('@/views/three/base/BaseInitView.vue'),
          meta: {
            title: '基础初始化',
            description: 'ThreeJs基础初始化'
          }
        },
        {
          path: 'draw-line',
          name: 'DrawLine',
          component: () => import('@/views/three/base/DrawLineView.vue'),
          meta: {
            title: '绘制线条',
            description: 'ThreeJs绘制线条'
          }
        },
        {
          path: 'sky-box',
          name: 'SkyBox',
          component: () => import('@/views/three/base/SkyBoxView.vue'),
          meta: {
            title: '天空盒',
            description: 'ThreeJs天空盒'
          }
        },
        {
          path: 'load-3d-model',
          name: 'Load3DModel',
          component: () => import('@/views/three/base/Load3DModelView.vue'),
          meta: {
            title: '加载3D模型',
            description: 'ThreeJs加载3D模型'
          }
        },
        {
          path: 'particle',
          name: 'Particle',
          component: () => import('@/views/three/base/ParticleView.vue'),
          meta: {
            title: '粒子系统',
            description: 'ThreeJs粒子系统'
          }
        }
      ]
    }
  ]
})

export default router
