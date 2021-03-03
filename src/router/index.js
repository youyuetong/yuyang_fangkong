import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from "@/views/Home";
import Userinfo from '@/views/userinfo/Userinfo';
import Index from '@/views/Index';
import UserMsg from "@/views/user/UserMsg";
import NurseMsg from "@/views/user/NurseMsg";
import AdminMsg from "@/views/user/AdminMsg"
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
        path: '/usermsg',
        name: '用户管理',
        component: UserMsg
      },
      {
        path: '/nursemsg',
        name: '医护人员管理',
        component: NurseMsg
      },
      {
        path: '/adminmsg',
        name: '管理员管理',
        component: AdminMsg
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
