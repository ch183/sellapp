import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
          {path: '/',name: 'Home',component: Home,children:[
            {path: '/',name: 'Goods',component: () => import('../views/Goods.vue')},
            {path: '/Evaluate',name: 'Evaluate',component: () => import('../views/Evaluate.vue')},           
            {path: '/Business',name: 'Business',component: () => import('../views/Business.vue')},
          ]},
          
  ]
})

export default router