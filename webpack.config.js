/**
 * webpack config
 */

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

const isProd = 'production' === process.env.NODE_ENV

const common = {
  mode: process.env.NODE_ENV,
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

const commonRenderer = {
  ...common,
  entry: {
    renderer: './src/renderer/boot'
  },
  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      inject: false
    })
  ]
}

export default function({ target }) {
  switch(target) {

    case 'main': return {
      ...common,
      target: 'electron-main',
      node: false,
      entry: {
        main: ['webpack/hot/poll?1000', './src/main/boot']
      },
      plugins: [
        ...common.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    }

    case 'renderer:electron': return [{
      ...commonRenderer,
      target: 'electron-renderer',
      node: false,
      devServer: {
        ...commonRenderer.devServer,
        port: 8080
      }
    }]

    case 'renderer:browser': return [{
      ...commonRenderer,
      target: 'web',
      devServer: {
        ...commonRenderer.devServer,
        port: 9090
      }
    }]

    default: throw new Error(`Unknow target "${target}"`)
  }
}
