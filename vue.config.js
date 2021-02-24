let proxyObj = {}

proxyObj['/'] = {
    ws: false,
    target: 'http://locahost:5556/',
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