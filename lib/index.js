'use strict';

var fs   = require('fs');
var path = require('path');
var glob = require('glob');

exports.register = function (server, options, next) {
  var globOptions = {
    nodir: true,
    strict: true,
    cwd: options.cwd || process.cwd(),
    ignore: options.ignore
  }

  var patterns = [];

  if (typeof options.routes === typeof patterns) {
    patterns = options.routes;
  } else {
    patterns = [ options.routes ];
  }

  console.log(patterns)

  patterns.forEach(function (pattern) {
    var files = glob.sync(pattern, globOptions);

    files.forEach(function (file) {
      server.route(require(globOptions.cwd + '/' + file));
    });
  })

  next();
};

exports.register.attributes = {
  multiple: false,
  pkg: require('../package.json')
};
