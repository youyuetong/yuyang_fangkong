import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from "@/views/Home";
import Userinfo from '@/views/userinfo/Userinfo';
import Index from '@/views/Index';
import UserMsg from "@/views/user/UserMsg";
import NurseMsg from "@/views/user/NurseMsg";
import AdminMsg from "@/views/user/AdminMsg"
import BattleMsg from "@/views/business/BattleMsg";
import RefuteMsg from "@/views/business/RefuteMsg";
import Antipioneer from "@/views/business/Antipioneer";
import RoleMsg from '@/views/system/RoleMsg'
import Vaccine from '@/views/system/Vaccine'
import ConformMsg from '@/views/system/ConformMsg'
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
      },
      {
        path: '/battlemsg',
        name: '战役动态',
        component: BattleMsg,
      },
      {
        path:'/antipioneer',
        name:'抗疫先锋',
        component:Antipioneer
      },
      {
        path: '/refutemsg',
        name: '辟谣专题',
        component: RefuteMsg,
      },
      {
        path: '/roleMsg',
        name: '记录表',
        component: RoleMsg,
      },
      {
        path: '/conformMsg',
        name: '公告管理',
        component: ConformMsg,
      },
      {
        path: '/vaccine',
        name: '疫苗预约',
        component: Vaccine,
      }
    ]
  },
]

const router = new VueRouter({
    routes
})

export default router
