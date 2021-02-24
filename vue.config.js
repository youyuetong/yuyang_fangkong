let proxyObj = {}

proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:5555/',
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