const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/webApp/' : '/',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  lintOnSave: false,
  transpileDependencies: [/* string or regex */],
  productionSourceMap: false,
  configureWebpack: () => { },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('~', resolve('src/common'))
  },
  devServer: {
    proxy: {
      '/phpfunction': {
        target: 'http://www.baiyunpro.cn/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/phpfunction': ''
        }
      }
    }
  }
};
