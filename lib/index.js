'use strict'

const glob = require('glob')
const castArray = require('cast-array')
const path = require('path');
const url = require('url');

exports.plugin = {
  register: (server, options) => {
    var globOptions = {
      nodir: true,
      strict: true,
      cwd: options.cwd || process.cwd(),
      ignore: options.ignore
    }

    castArray(options.routes).forEach(function (pattern) {
      const files = glob.sync(pattern, globOptions)

      files.forEach(async function (file) {
        try {
          const route = await import(url.pathToFileURL(path.resolve(globOptions.cwd, file)))
          server.route(route.default || route)
        } catch (e) {
          console.log(e);
        }
      })
    })
  },

  pkg: require('../package.json')
}
