// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/dist/',///QN/dist/
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets foe you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/wap/*': {///QN
                target: 'http://47.96.0.33:9090',//http://47.96.0.33:9090 //http://localhost:8888 //https://www.zqwt360.com
                changeOrigin: true,
            },
            '/wap/myhome/*': {
                target: 'http://47.96.0.33:9090',
                changeOrigin: true,
            },
            '/wap/borrow/*': {
                target: 'http://47.96.0.33:9090',
                changeOrigin: true,
            },
            '/activity/*': {
                target: 'http://47.96.0.33:9090',
                changeOrigin: true,
            }

        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
