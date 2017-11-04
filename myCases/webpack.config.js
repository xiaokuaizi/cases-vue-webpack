var path = require('path')
var webpack = require('webpack')

var glob = require('glob');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');

//各文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src'); //源码目录
var DIST_PATH = path.resolve(ROOT_PATH, 'dist'); //生产环境目录打包目录
var VIEWS_PATH = path.resolve(ROOT_PATH, 'views'); //模板目录
var NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules'); //npm包目录




var entryHtml = glob.sync(VIEWS_PATH + '/**/*.html'); //匹配入口html文件 数组
var entryTpl = {}; //存放模板对象 用于跟入口js对应  entryHtml转换成key-vlaue
var plugins = []; //存放动态生成的插件数组

entryHtml.forEach(function(filePath){
  var entryPath = path.dirname(filePath); //各个文件路径 
 
  entryPath = entryPath.substring(entryPath.lastIndexOf('\/')+1); //html文件前一级的文件夹名称

  var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.')); //html的文件名

  var conf = {
      template: filePath,
      filename: 'views/' + entryPath + '/'+filename + '.html',
      inject:'body',
      chunks:['vender',filename]
  }
  plugins.push(new HtmlwebpackPlugin(conf));
  entryTpl[filename] = filePath;
});

var entryFiles = glob.sync(SRC_PATH + '/**/*.{js,vue}'); //匹配入口js文件 数组
var entryJs = {}; //entryFiles转换成key-value
entryFiles.forEach(function(filePath){
    if(filePath.indexOf('common')==-1){
        var entryName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        if(entryName in entryTpl){
            entryJs[entryName] = filePath;
        }
    }
});

module.exports = {
  entry: entryJs,
  output: {
    path: DIST_PATH,
    filename: '[name]/[name].js',
    publicPath: '//dev.sunlijun.com:8080/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
