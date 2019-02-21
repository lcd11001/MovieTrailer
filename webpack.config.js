const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PUBLIC_DIR = path.resolve(__dirname, 'public')
const BUILD_DIR = path.resolve(__dirname, 'dist')

module.exports = (env, args) => {
    const IS_DEBUG = args.mode === 'development'

    return {
        entry: './src/client.js',
        output: {
            path: BUILD_DIR,
            publicPath: '/'
        },
        devtool: IS_DEBUG ? 'cheap-module-source-map' : '',
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
        devServer: {
            open: true,
            port: 4000,
            compress: true,
            historyApiFallback: true,
            contentBase: PUBLIC_DIR
        }
    }
}