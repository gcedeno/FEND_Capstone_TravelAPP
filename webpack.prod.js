const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output:{
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
	   },
    mode: 'production',
    devtool: 'source-map',
    
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s?[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
            {
            test: /\.s?[ac]ss$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
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
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            navigateFallback:'index.html',
            cleanupOutdatedCaches: true,
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[id].css',
        }),
        new HtmlWebPackPlugin({
            title:'Travel App',
            template: "./src/client/views/index.html",
            filename: "./index.html",
        })
    ],
    resolve: {
        extensions: ['.js'],
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
      },

}
