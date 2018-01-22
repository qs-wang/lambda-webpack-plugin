const path = require('path');

module.exports = {
  output: {
    path: path.resolve('.'),
    filename: '[name].js',
    library: 'main',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js']
  },
  devtool: 'inline-source-map',
  target: 'node',
  node: {
    fs: 'empty'
  }
};
