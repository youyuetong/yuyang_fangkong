import {post, get} from './api'
import da from "element-ui/src/locale/lang/da";
// 登录
export const login=(data )=>post({url:'/user/login', data})

// 获取公告列表
export const noticeList=(data )=>get('/notice/list')

// 获取战役动态列表
export const battleList=(data )=>get('/battle/list')

// 登出
export const goOut=(data)=>get('/user/out')

// 用户管理(分页)无条件 需要当前页 和 数(current、size)
export const user_page=(data)=>get('/user/page',data);

//用户管理添加按钮请求
export const  user_add=(data)=>post({url:'/user/add',data});

//用户管理修改按钮请求
export const updateUser=(data)=>post({url:'user/updateUser',data});

// 删除用户
export const userdelete=(data)=>get('/user/delete',data);
//医用人员管理
export const nursepage=(data)=>get('/user/nursePage',data);
//医用人员管理添加按钮请求
export const nurseadd=(data)=>post({url:'/user/nurseadd',data});
//医用人员管理编辑按钮
export const updatenurse=(data)=>post({url:'/user/updateUser',data})
//医用人员管理删除按钮
export const nursedel=(data)=>get('/user/delete',data)

//管理人员管理分页
export const adminpage=(data)=>get('/user/admin',data)
// 添加管理员
export const addadmin=(data)=>post({url:'/user/addadmin',data})

// 编辑管理人员用updateUser这个接口一摸一样。 删除也是用/user/delete



// 战役动态分页
export const battlepage=(data)=>get('/battle/page',data);
//战役动态添加
export const battleadd=(data)=>post({url:'/battle/add',data});
//战役动态编辑
export const battleupdate=(data)=>post({url:'/battle/update',data})
//战役动态删除
export const battledel=(data)=>get('/battle/delete',data)
//避谣专题表格查询
export const refutepage=(data)=>get('/refute-rumor/page',data)
//避谣专题添加按钮
export const refuteadd=(data)=>post({url:'/refute-rumor/add',data})
//避谣专题编辑按钮
export const refuteupdate=(data)=>post({url:'/refute-rumor/update',data})
//避谣专题删除按钮
export const refutedel=(data)=>get('/refute-rumor/delete',data)










