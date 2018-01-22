const yazl = require('yazl');
const path = require('path');
var RawSource = require('webpack-sources').RawSource;


function LambdaWebpackPlugin(options) {
  // Setup the plugin instance with options...
  // TODO: support options.
}

LambdaWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {

    if (this.isChild()) {
      callback();
      return;
    }

    Object.keys(compiler.options.entry).forEach(function (key, index, array) {
      const entryObj = path.parse(key);
      let zipFileName = entryObj.base;
      let outputFolder = '';
      if (entryObj.dir) {
        const pathSegments = entryObj.dir.split(path.sep);
        if (pathSegments.length > 1) {
          zipFileName = pathSegments[pathSegments.length - 1];
        }
        if (pathSegments.length > 0) {
          outputFolder = pathSegments[0];
        }
      }

      var zipFile = new yazl.ZipFile();

      zipFile.addBuffer(
        new Buffer(key + '.js'),
        entryObj.base + '.js'
      );

      zipFile.end();

      // accumulate each buffer containing a part of the zip file
      var bufs = [];

      zipFile.outputStream.on('data', function (buf) {
        bufs.push(buf);
      });

      zipFile.outputStream.on('end', function () {
        var outputPath = compilation.options.output.path + path.sep + outputFolder;

        var outputFilename = zipFileName;

        var extension = '.zip';

        // combine the output path and filename
        var outputPathAndFilename = path.resolve(
          compilation.options.output.path, // ...supporting both absolute and relative paths
          outputPath,
          path.basename(outputFilename, '.zip') + extension // ...and filenames with and without a .zip extension
        );

        var relativeOutputPath = path.relative(
          compilation.options.output.path,
          outputPathAndFilename
        );

        // add our zip file to the assets
        compilation.assets[relativeOutputPath] = new RawSource(Buffer.concat(bufs));

        if (index == array.length - 1) {
          callback();
        }

      });


    })
  });
};

module.exports = LambdaWebpackPlugin;