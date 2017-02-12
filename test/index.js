var path = require('path');

var common_proxy = {
   // target: 'http://test.hitour.cc',
   // target: 'http://sandbox.hitour.cc',
   // target: 'http://trial.hitour.cc',
   // target: 'http://backend.hitour.cc',
   changeOrigin: true,
   pathRewrite: {}
}

module.exports = {
   build: {
     env: require('./prod.env'),
     index: path.resolve(__dirname,'../dist/index.html'),
     assetsRoot: path.resolve(__dirname,'../dist'),
     assetsSubDirectory: 'static',
     assetsPublicPath: '/themes/kitchen/dist/',
     productionSourceMap: true,
     productionGzip: false,
     productionGzipExtension: ['js','css']
   },
   {
     env: require('./dev.env'),
     port: 60003,
     assetsSubDirectory: 'static',
     assetsPublicPath: '/',
     proxyTable: {
       '/admin/': common_proxy,
       '/chef/': common_proxy,
       '/themes/': common_proxy,
       '/markMi/': common_proxy
     },
     cssSourceMap: false
   }
}
