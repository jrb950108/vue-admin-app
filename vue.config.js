const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CDN_PREFIX = 'https://jrb-1256124247.cos.ap-shanghai.myqcloud.com/img/'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  // 打包时不生成.map文件
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          // 移除控制台语句
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_debugger: true,
                drop_console: true
              }
            }
          }),
          // 开启gzip压缩生成gz后缀的文件，服务端开启gzip支持后默认取gz文件输出
          new CompressionWebpackPlugin({
            test: /\.(js|css|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
      return {}
    }
  },
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .module
      .rule('images')
      .test(/\.(jpg|png|gif|jpeg)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
        // 根据环境使用cdn或相对路径
        publicPath: process.env.NODE_ENV === 'production' ? CDN_PREFIX : '/img',
        outputPath: 'img',
        name: '[name].[hash:8].[ext]'
      })
      .end()
  }
}
