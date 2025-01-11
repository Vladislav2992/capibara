import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Catalog from '@/pages/Catalog.vue'
import Product from '@/pages/ProductPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },    
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
    },    
    {
      path: '/product/:id',
      name: 'product',
      component: Product,
    },    
  ],
})

export default router