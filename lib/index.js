'use strict'

var glob = require('glob')
var castArray = require('cast-array')

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

      files.forEach(function (file) {
        var route = require(globOptions.cwd + '/' + file)
        server.route(route.default || route)
      })
    })
  },

  pkg: require('../package.json')
}
