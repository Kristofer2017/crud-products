import { createRouter, createWebHistory } from 'vue-router'
import MostrarDatos from '@/views/MostrarDatos.vue'
import AgregarDatos from '@/views/AgregarDatos.vue'

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    component: MostrarDatos
  },
  {
    path: '/products/add',
    component: AgregarDatos
  },
  {
    path: '/products/edit',
    component: AgregarDatos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
