const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const NodeExternals = require('webpack-node-externals')

const PUBLIC_DIR = path.resolve(__dirname, 'public')
const BUILD_CLIENT_DIR = path.resolve(__dirname, 'dist_client')
const BUILD_SERVER_DIR = path.resolve(__dirname, 'dist_server')

const CommonConfig = (env, args) => {
    const IS_DEBUG = args.mode === 'development'

    return {
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
        resolve: {
            alias: {
                '@material-ui/core': '@material-ui/core/es'
            }
        }
    }
}

const ClientConfig = (env, args) => {
    return {
        ...CommonConfig(env, args),
        plugins: [
            new CleanWebpackPlugin(BUILD_CLIENT_DIR),
            new HtmlWebpackPlugin({
                title: 'Movies Trailer',
                favicon: path.join(PUBLIC_DIR, './favicon.ico'),
                template: 'index.template.html',
                filename: path.join(BUILD_CLIENT_DIR, '/index.html')
            }),
            new CopyPlugin([
                {
                    from: PUBLIC_DIR,
                    to: BUILD_CLIENT_DIR
                }
            ])
        ],
        entry: './src/client',
        output: {
            path: BUILD_CLIENT_DIR
        }
    }
}

const ServerConfig = (env, args) => {
    return {
        ...CommonConfig(env, args),
        plugins: [
            new CleanWebpackPlugin(BUILD_SERVER_DIR),
        ],
        target: 'node',
        entry: './src/server',
        output: {
            path: BUILD_SERVER_DIR
        },
        externals: [NodeExternals()]
    }
}

module.exports = (env, args) => {
    let configs = [
        ClientConfig(env, args),
        ServerConfig(env, args)
    ]

    // console.log('configs', configs)
    return configs
}