import {post, get} from './api'
// 登录
export const login=(data )=>post({url:'/user/login', data})
// 获取公告列表
export const noticeList=(data )=>get('/notice/list')

// 获取战役动态列表
export const battleList=(data )=>get('/battle/list')