const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        index: './lib/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: '永reactUI',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '永：react-UI',
            template: "index.html"
        })
    ]
};