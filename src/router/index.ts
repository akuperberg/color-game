import { createRouter, createWebHistory } from 'vue-router'
import ExerciseMain from '../pages/exercise/components/ExerciseMain.vue'
import AdminMain from '../pages/admin/components/AdminMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/exercise',
      name: 'exercise',
      component: ExerciseMain
    },
    {
      path: '/administration',
      name: 'administration',
      component: AdminMain
    },
    {
      path: '/',
      redirect: '/exercise'
    }
  ],
})

export default router
