const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    home: './src/js/glob.js',
    single: './src/single/single.js'
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
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
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
    hot:true,
    contentBase: "./dist"
  },
  plugins: [
      new HtmlWebpackPlugin({
      template:'src/index.html',
      title:'Innopolis Cinema Learning Page',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template:'src/single/index.html',
      title:'Innopolis Cinema Learning Page',
      filename: 'single/index.html',
      chunks: ['single']
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
        },
      ],
    }),
  ],
};