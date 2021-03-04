import axios from 'axios'
//创建一个实例
const instance = axios.create({
    baseURL:'http://192.168.102.116:5556/',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
    headers: {'Content-Type':'application/json','responseType': 'blob'}
});
//添加请求拦截器
// instance.interceptors.request.use(function (config){
//     // 在发送请求之前做些什么
//     console.log("config",config)
//     config.headers.Authorization='Bearer ' + (sessionStorage.getItem("token")?sessionStorage.getItem("token"):"");
//     return config
// },function (error){
//     // 对请求错误做些什么
//     return Promise.reject(error);
// })
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('response:',response)
    //如果写response.data 是只返回data，把其他的拦截掉
    // return response.data;
    return response.data
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const get = (url, data={}) =>{
    return new Promise((resolve, reject) => {
        instance.get(url,{params:data }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })

}
const post = ({url, data={}}) =>{
    return new Promise((resolve, reject) => {
        instance.post(url,data).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })

}
export {get,post}
