const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PUBLIC_DIR = path.resolve(__dirname, 'public')
const BUILD_DIR = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/client.js',
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: '[name].[contenthash:8].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: /public/,
                loader: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(BUILD_DIR),
        new HtmlWebpackPlugin({
            title: 'Movies Trailer',
            favicon: path.join(PUBLIC_DIR, './favicon.ico'),
            template: 'index.template.html'
        }),
        new CopyPlugin([
            {
                from: PUBLIC_DIR,
                to: BUILD_DIR
            }
        ])
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    devServer: {
        open: true,
        port: 4000,
        compress: true,
        historyApiFallback: true,
        contentBase: PUBLIC_DIR
    }
}