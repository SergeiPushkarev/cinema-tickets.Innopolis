const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    home: './js/glob.js',
    single: './single/single.js'
  },
  output: {
    filename: './js/[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  devServer:{
    port:4444,
    hot:true
  },
  plugins: [
      new HtmlWebpackPlugin({
      template:'index.html',
      title:'Innopolis Cinema Learning Page',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template:'single/index.html',
      title:'Innopolis Cinema Learning Page',
      filename: 'single/index.html',
      chunks: ['single']
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'img',
          to: 'img',
        },
      ],
    }),
  ],
};