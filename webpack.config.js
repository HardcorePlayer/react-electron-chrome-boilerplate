/**
 * webpack config
 */

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

const isProd = 'production' === process.env.NODE_ENV

const common = {
  mode: process.env.NODE_ENV,
  node: false,
  devtool: !isProd ? 'inline-source-map' : 'hidden-source-map',
  output: {
    filename: !isProd ? '[name].js' : '[name].[contenthash].js'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
        options: {

        }
      }
    },{
      test: /\.css$/
    }]
  },
  plugins: [

  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
}

export default [{
  ...common,
  target: 'electron-main',
  entry: {
    main: './src/main'
  }
},{
  ...common,
  target: 'electron-renderer',
  entry: {
    renderer: './src/boot'
  },
  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      inject: false
    })
  ]
}]
