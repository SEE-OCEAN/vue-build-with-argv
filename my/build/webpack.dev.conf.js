var utils = require('./utils')
var webpack = require('webpack')
var config = require('../../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var pathPrefix = 'template/dev/'

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

process.sid = process.argv.pop();
process.apptype = process.argv[process.argv.length - 1] === 'fs' ? 'fs' : 'wx';
process.tasktype = process.argv[2] == 'p2' ? 'program2' : 'program1';

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      sid: process.sid,
      apptype: process.apptype,
      filename: 'index.html',
      // template: process.argv[2] === 'p2' ? pathPrefix + 'program2-index.html' : pathPrefix + 'program1-index.html',
      template: `${pathPrefix}${process.tasktype}-index.html`,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})