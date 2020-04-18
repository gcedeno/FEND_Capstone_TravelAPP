const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js', //Starting place for building dependencies tree
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'development',
    devtool: 'inline source-map',
    stats: 'verbose',
    devServer:{
        contentBase:'dist'
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader',
            },
            {
              test: /\.s?[ac]ss$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name(file) {
                      if (process.env.NODE_ENV === 'development') {
                        return '[path][name].[ext]'
                      }
                      return '[contenthash].[ext]'
                    },
                  },
                },
              ],
            },
            {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                  },
                },
              ],
            },
          ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Travel App',
            filename: './index.html',
            template: './src/client/views/index.html',
          }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ],
    resolve: {
        extensions: ['.js'],
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
      },
}

