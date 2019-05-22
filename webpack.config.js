const path = require('path');
module.exports = {

    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: '永reactUI',
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
            {test: /\.svg$/, loader: 'svg-sprite-loader'},
            {test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
        ],
    },


};