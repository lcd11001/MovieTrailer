const path = require('path');

// https://github.com/timarney/react-app-rewired#extended-configuration-options
module.exports = {
    // The paths config to use when compiling your react app for development or production.
    paths: function (paths, env) {        
        paths.appIndexJs = path.resolve(__dirname, 'src/client.js')

        return paths;
    },
}