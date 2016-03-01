'use strict'

var glob = require('glob')
var castArray = require('cast-array')

exports.register = function (server, options, next) {
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

  next()
}

exports.register.attributes = {
  multiple: false,
  pkg: require('../package.json')
}
