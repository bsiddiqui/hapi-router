'use strict'

var glob = require('glob')
var castArray = require('cast-array')

/**
 * Borrowed from gulpjs/gulp-cli
 * https://github.com/gulpjs/gulp-cli/pull/214
 */
var pathToFileURL = require('url').pathToFileURL;

var importESM;
try {
  importESM = new Function('id', 'return import(id);');
} catch (e) {
  importESM = null;
}

async function requireOrImport(path) {
  try {
    return require(path);
  } catch (e) {
    if (pathToFileURL && importESM && e.code === 'ERR_REQUIRE_ESM') {
      var url = pathToFileURL(path);
      var mjs = await importESM(url);
      return mjs;
    }
  }  
}

exports.plugin = {
  register: (server, options) => {
    var globOptions = {
      nodir: true,
      strict: true,
      cwd: options.cwd || process.cwd(),
      ignore: options.ignore
    }

    castArray(options.routes).forEach(function (pattern) {
      var files = glob.sync(pattern, globOptions)

      files.forEach(async (file) => {
        var route = await requireOrImport(globOptions.cwd + '/' + file)
        server.route(route.default || route)
      })
    })
  },

  pkg: require('../package.json')
}
