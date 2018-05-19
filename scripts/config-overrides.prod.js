const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function(config) {
  console.log('bbb', config)
  
  // let entryList = config.entry
  // entryList.splice(entryList.length -1, 1, resolveApp('src-es5/index.js'))

  config.appBuild = resolveApp('build-es5')
  config.appIndexJs = resolveApp('src-es5/index.js')

  console.log('BBB', config)
}