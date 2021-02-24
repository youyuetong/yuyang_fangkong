import {post, get} from './api'
// 登录
export const login=(data )=>post({url:'/user/login', data})

// 登出
export const out=(data)=>get('/user/out')

// 用户管理(分页)无条件 需要当前页 和 数(current、size)
export const user_page=(data)=>post({url:'/user/page',data})

// 展示user表格的所有数据 角色管理
export const user_list=(data)=>get('/user/list')

// 更改用户权限update_role 就是角色管理的update
export const update_role=(data)=>post({url:'/user/update_role',data})

// 更改个人信息
export const update_user=(data)=>post({url:'/user/update_user',data})

// 医护人员管理分页 需要当前页 和 数(current、size)
export const nurse_page=(data)=>post({url:'/user/nurse_page',data})

// admin列表
export const admin_list=(data)=>get('/user/admin_list')


// 获取公告列表
export const noticeList=(data )=>get('/notice/list')

// 获取战役动态列表
export const battleList=(data )=>get('/battle/list')



