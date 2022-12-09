'use strict'

const glob = require('glob-promise')
const path = require('path');
const url = require('url');

exports.plugin = {
  register: async (server, options) => {
    var globOptions = {
      nodir: true,
      strict: true,
      cwd: options.cwd || process.cwd(),
      ignore: options.ignore
    }
    for (const route of [options.routes].flat()) {
      const files = await glob(pattern, globOptions);
      for (const file of files) {
        try {
          const route = await import(url.pathToFileURL(path.resolve(globOptions.cwd, file)))
          await server.route(route.default || route)
        } catch (e) {
          console.log(e);
        }
      }
    }
  },

  pkg: require('../package.json')
}
