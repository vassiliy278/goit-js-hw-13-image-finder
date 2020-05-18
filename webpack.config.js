const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
const debounce = require('lodash.debounce');

console.log(`dirname: ${__dirname}`)

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] //работает справа налево
            },
            {   test: /\.hbs$/,
                loader: "handlebars-loader"
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin ({
            filename: 'style.css'
        })
    ],
    devServer: {
        port: 1212
    },
    devtool: 'cheap-eval-source-map'
    }

