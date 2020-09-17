const base = require("./webpack.config.js");
const {SourceMapDevToolPlugin} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
base.module.rules.push(
    {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
    }
);
module.exports = Object.assign({}, base, {
    mode: "development",
    entry: {
        index: "./local.dev.tsx"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "永：react-UI",
            template: "local.dev.html"
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
});