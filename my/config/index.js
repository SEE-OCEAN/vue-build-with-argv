// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var assetsRoot
var subDirectory
var indexTemplate
var indexFilePrePath
var indexFiles
var isBuild = process.env.npm_lifecycle_event === 'build'

// 根据打包命令，设置process参数(npm run build p2 fs)
process.apptype = process.argv[process.argv.length - 1] === 'fs' ? 'fs' : 'wx'

if (isBuild) {
  indexTemplate = '../template/build/'
  assetsRoot = 'dist'
  indexFilePrePath = `../../indexhtml/outdir/page/${process.apptype}/`

  // 判断打包任务类型,以确定（子目录）（模板页面）（输出页面）
  if (process.argv[2] === 'p2') {
    // npm run build p2
    subDirectory = 'dir2'
    indexTemplate += 'program2-index.html'
    indexFile = 'program2.index.htm'
  } else {
    // npm run build
    subDirectory = 'dir1'
    indexTemplate += 'program1-index.html'
    indexFile = 'program1.index.htm'
  }

  // 指示信息
  let broadcast = {
    执行命令: 'npm ' + JSON.parse(process.env.npm_config_argv).original.join(' '),
    执行文件: process.argv[1],
    输出目录: assetsRoot + '/' + subDirectory,
    模板页面: indexTemplate.replace(/^(.\/|..\/)*/g, ''),
    输出页面: path.resolve(__dirname, indexFilePrePath + indexFile)
  }
  for (const key in broadcast) {
    console.log(key + ': ', broadcast[key])
  }
}

module.exports = {
  build: {
    env: require('./prod.env'),
    // 模板页面
    indexTemplate: path.resolve(__dirname, indexTemplate),
    // 输出页面
    index: path.resolve(__dirname, indexFilePrePath + indexFile),
    // 输出的目录
    assetsRoot: path.resolve(__dirname, '../' + assetsRoot),
    // 输出目录的子目录
    assetsSubDirectory: subDirectory,
    // 注入页面的资源的公共路径
    assetsPublicPath: '../some/path/' + assetsRoot + '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    // host: '10.60.xxx.xx',
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/a/b': {
        target: 'http://127.0.0.1:8888',
        pathRewrite: {
          '^/a/b': '/a/b'
        }
      },
      './b': {
        target: 'http://127.0.0.1:8888/a'
      },
      '/a/c': {
        target: 'http://127.0.0.1:8888',
        pathRewrite: {
          '^/a/c': '/a/w'
        }
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