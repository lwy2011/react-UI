const commonConfig = require('./webpack.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, commonConfig, {
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            title: '永：react-UI',
            template: "index.html"
        })
    ]
});