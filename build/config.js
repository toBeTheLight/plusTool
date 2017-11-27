var path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  console.log(__dirname, '..', dir)
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: resolve("/src/index.js"),//已多次提及的唯一入口文件
  output: {
    path: resolve("/dist"),//打包后的文件存放的地方
    filename: "plusTools.js",//打包后输出文件的文件名
    library: "$plus",
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        exclude: ['/node_modules/'],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}