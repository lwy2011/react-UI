const base = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = Object.assign({}, base, {
    mode: 'production',
    entry: {
        example: './local.dev.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'doc/')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '永：react-UI',
            template: "local.dev.html",
            filename: "index.html"
        })
    ]

});