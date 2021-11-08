const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';
const handler = (percentage, message, ...args) =>{
  console.info(percentage, message, ...args);
};
const stylesHandler = MiniCssExtractPlugin.loader;
function setupDevtool() {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
};


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output : {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.[tj]sx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },
    {
      test: /\.s[ac]ss$/i,
      use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
    },
    {
      test: /\.css$/i,
      use: [stylesHandler, "css-loader", "postcss-loader"],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: "asset",
    },
  ]
  },
  plugins: [
    new webpack.ProgressPlugin(handler),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: IS_DEV,
  },
  devtool: setupDevtool(),

};