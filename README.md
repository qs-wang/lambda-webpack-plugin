# lambda-webpack-plugin 

Webpack plugin to zip up multiple lambda handlers. So far it handles only very simple case to fit my project's requirements. 


The lambda folder structure is as below:

project root

package.json

---- lambda1

--------  index.js

---- lambda2

--------  index.js

---- lib

--------  utils.js


See the example config below.


## Installation

`npm install --save-dev lambda-webpack-plugin`

## Usage

**webpack.config.js**

```js
var LambdaWebpackPlugin = require('lambda-webpack-plugin');

module.exports = {
  // ...
  webpackConfig.entry = {
    'dist/labmda1/handler': './lambda1/index.js',
    'dist/labmda2/handler': './lambda2/index.js'
  };

  plugins: [
    new LambdaWebpackPlugin()
  ]
};
```

## Output
The following zip files are created, and they're ready to deploy to aws platform.

dist/lambda1.zip

dist/lambda2.zip
