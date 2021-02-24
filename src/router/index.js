import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from "@/views/Home";
import Test2 from "@/views/Test2";
import Test1 from "@/views/Test1";
import Userinfo from '@/views/userinfo/Userinfo'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/test1',
        name: '选项1',
        component: Test1
      },
      {
        path: '/test2',
        name: '选项2',
        component: Test2
      },
      {
        path: '/userinfo/list',
        name: '个人中心',
        component: Userinfo
      },
      {
        path: '/home/index',
        name: 'Index',
        component: Index,
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
