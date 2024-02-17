const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const NodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const PUBLIC_DIR = path.resolve(__dirname, 'public')
// const PUBLIC_URL = '/ssr'
const PUBLIC_URL = '/'

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
                    include: [
                        path.resolve(__dirname, 'public'),
                        BUILD_CLIENT_DIR
                    ],
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
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: args.mode,

                PUBLIC_DIR: PUBLIC_DIR,
                PUBLIC_URL: PUBLIC_URL,

                BUILD_CLIENT_DIR: BUILD_CLIENT_DIR,
                BUILD_SERVER_DIR: BUILD_SERVER_DIR
            })
        ],
        devServer: {
            contentBase: BUILD_CLIENT_DIR
        }
    }
}

const ClientConfig = (env, args) => {
    const common = CommonConfig(env, args)
    return {
        ...common,
        plugins: [
            ...common.plugins,
            new CleanWebpackPlugin(),
            new CopyPlugin([
                {
                    from: PUBLIC_DIR,
                    to: BUILD_CLIENT_DIR,
                    globOptions: {
                        ignore: ['**/index.html'],
                        dot: true,
                        gitignore: true,
                        ignore: ['**/.*'],
                    },
                    // Add the recursive option to copy all resources in the child folder
                    options: {
                        recursive: true
                    }
                }
            ]),
            new HtmlWebpackPlugin({
                title: 'Movies Trailer',
                favicon: path.join(PUBLIC_DIR, './favicon.ico'),
                template: 'index.template.html',
                filename: path.join(BUILD_CLIENT_DIR, '/index.html')
            }),
            new webpack.DefinePlugin({
                __isBrowser__: "true"
            })
        ],
        entry: './src/client',
        output: {
            path: BUILD_CLIENT_DIR,
            publicPath: PUBLIC_URL
        }
    }
}

const ServerConfig = (env, args) => {
    const common = CommonConfig(env, args)
    return {
        ...common,
        plugins: [
            ...common.plugins,
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                __isBrowser__: "false"
            })
        ],
        target: 'node',
        entry: './src/server',
        output: {
            path: BUILD_SERVER_DIR,
            publicPath: PUBLIC_URL
        },
        externals: [NodeExternals({
            whitelist: [
                /@material-ui\/core\/*./
            ]
        })]
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
