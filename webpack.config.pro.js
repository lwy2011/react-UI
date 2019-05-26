const base = require('./webpack.config.js');

module.exports = Object.assign({}, base, {
    mode: 'production',
    entry: {
        index: './lib/index.tsx'
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
        // 'react-router-dom': {
        //     commonjs: 'react-router-dom',
        //     commonjs2: 'react-router-dom',
        //     amd: 'react-router-dom',
        //     root: 'ReactRouterDOM',
        // },
        // 'react-router': {
        //     commonjs: 'react-router',
        //     commonjs2: 'react-router',
        //     amd: 'react-router',
        //     root: 'ReactRouter',
        // },
    }
});