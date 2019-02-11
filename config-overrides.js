const path = require('path');
const nodeExternals = require('webpack-node-externals')

// https://github.com/timarney/react-app-rewired#extended-configuration-options
module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function (config, webpackEnv) {

        const currentAlias = config.resolve.alias;

        config.resolve.alias = {
            ...currentAlias,
            '@material-ui/core': '@material-ui/core/es'
        };

        console.log('webpack', config, 'webpackEnv', webpackEnv)

        return config;
    },
    // The paths config to use when compiling your react app for development or production.
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'src/client.js')

        return paths;
    },
}