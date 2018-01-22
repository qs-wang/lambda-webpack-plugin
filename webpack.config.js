const webpack = require('webpack');
var webpackConfig = require('./webpack.config.common');
const fs = require('fs');

webpackConfig.entry = {
  'dist/index': './index.js'
};


module.exports = webpackConfig;
