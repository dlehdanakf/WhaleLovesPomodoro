const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

module.exports = {
    entry: {
        './index': path.resolve(__dirname, './src/index.js'),
        './background' : path.resolve(__dirname, './background.js')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                loaders : ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use : ['css-loader', 'sass-loader?outputStyle=compressed']
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            context: ''
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: "head",
            excludeAssets: [/background.js/]
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new ExtractTextPlugin('main.css')
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    node: {
        fs: "empty"
    }
};