// let proxyObj = {}
//
// proxyObj['/'] = {
//     ws: false,
//     target: 'http://localhost:5556/',
//     changeOrigin: true,
//     pathRewrite:{
//         '^/': '/'
//     }
// }
//
// module.exports = {
//     devServer: {
//         proxy: proxyObj
//     }
// }