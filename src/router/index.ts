import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/exercise',
      name: 'exercise',
      component: Main
    },
    {
      path: '/',
      redirect: '/exercise'
    }
  ],
})

export default router
