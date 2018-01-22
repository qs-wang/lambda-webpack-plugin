var webpackConfig = require('./webpack.config.common');

const LambdaWebpackPlugin = require('./index');

webpackConfig.plugins = [
  new LambdaWebpackPlugin()
]

module.exports = webpackConfig;
