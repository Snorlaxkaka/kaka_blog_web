const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: '/',  // 自定义域名时使用根路径
  productionSourceMap: false,
  chainWebpack: (config) => {
    //最小化代码
    config.optimization.minimize(true)
    //分割代码
    config.optimization.splitChunks({
      chunks: 'all',
    })
    // // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true,
    //   })
    //   .end()
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          // new PrerenderSPAPlugin({
          //   staticDir: path.join(__dirname, '/../serve/web'),
          //   routes: ['/', '/blogs'],
          //   // renderer: new Renderer({
          //   //   inject: {
          //   //     foo: 'bar'
          //   //   },
          //   //   headless: true,
          //   //   renderAfterDocumentEvent: 'render-event'
          //   // })
          // }),
          // CleanWebpackPlugin: 清理输出目录
          new CleanWebpackPlugin(),
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
            threshold: 1024,
            minRatio: 0.8,
          }),
        ],
      }
    } else {
      // 为开发环境修改配置...

    }
    // 添加路径别名
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
}
