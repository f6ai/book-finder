const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // not working
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // this is the correct import format!!!

module.exports = {
    entry: ['@babel/polyfill', './src/sass/main.scss','./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.[contentHash].js' // it gives a unique hash for each version
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template.html'
        }),
        new CleanWebpackPlugin()
        /* new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
            chunkFilename: "[name].css"
        }) */
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                sideEffects: true,
                use: [
                    "style-loader", // 
                    "css-loader", // 2. turns css into common js
                    "sass-loader" // 1. turns sass into css
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader' // require the image in JS
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: 'img'
                        }
                    }
            }
        ]
    }

};