
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname ,"./build"),
        filename: '[name].js'
    },
    module: {
        rules: [
          {
            test: /\.scss/,
            use: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader','sass-loader']
            })
          },
          // {
          //   test: /\.m?js$/,
          //   exclude: /(node_modules|bower_components)/,
          //   use: {
          //     loader: 'babel-loader',
          //     options: {
          //       presets: ['@babel/preset-env']
          //     }
          //   }
          // }
        ]
      },
    plugins: [
        
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        }),
         new HtmlWebpackPlugin({  // Also generate a test.html
            template: './index.html'
          })
      ], 
      resolve:{
          extensions:['.js','.scss']
      },
    
};