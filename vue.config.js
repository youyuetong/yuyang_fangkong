let proxyObj = {}

proxyObj['/'] = {
    ws: false,
    target: 'http://192.168.102.116:5556/',
    changeOrigin: true,
    pathRewrite:{
        '^/': '/'
    }
}

module.exports = {
    devServer: {
        proxy: proxyObj
    }
}