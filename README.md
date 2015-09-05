# hapi-router

[![Build Status](https://travis-ci.org/bsiddiqui/hapi-router.svg?branch=master)](https://travis-ci.org/bsiddiqui/hapi-router) [![Code Climate](https://codeclimate.com/github/bsiddiqui/hapi-router/badges/gpa.svg)](https://codeclimate.com/github/bsiddiqui/hapi-router) [![Test Coverage](https://codeclimate.com/github/bsiddiqui/hapi-router/badges/coverage.svg)](https://codeclimate.com/github/bsiddiqui/hapi-router) [![Version](https://badge.fury.io/js/hapi-router.svg)](http://badge.fury.io/js/hapi-router) [![Downloads](http://img.shields.io/npm/dm/hapi-router.svg)](https://www.npmjs.com/package/hapi-router)

Route loader for [hapi](https://github.com/spumko/hapi).

## Install

```bash
$ npm install hapi-router
```

## Usage

```js
server.register({
  register: require('hapi-router'),
  options: {
    routes: 'src/**/*Route.js' // uses glob to include files
  }
}, function (err) {
  if (err) throw err;
});
```

## Options

##### routes

*Required* <br/>
Type: `string` / `array`

The [glob](https://github.com/bsiddiqui/hapi-router#glob-primer) pattern you would like to include

##### ignore

Type: `string` / `array`

The pattern or an array of patterns to exclude

##### cwd

Type: `string`

The current working directory in which to search (defaults to `process.cwd()`)


## Specifying Routes

Any files that match your routes glob will be loaded

Example route file:
```js
module.exports = [
  {
    path: '/test1',
    method: 'GET',
    handler: function (request, reply) {
      reply('hello');
    }
  },
  {
    path: '/test2',
    method: 'GET',
    handler: function (request, reply) {
      reply('hello');
    }
  }
]
```

## Glob Primer

Example globs:
```js
'routes/*.js'    // match all js files in the routes directory
'routes/**/*.js' // recursively match all js files in the routes directory
'**/*Route.js'   // match all js files that end with 'Route'
```

From [isaacs](https://github.com/isaacs/node-glob):

"Globs" are the patterns you type when you do stuff like `ls *.js` on
the command line, or put `build/*` in a `.gitignore` file.

The following characters have special magic meaning when used in a
path portion:

* `*` Matches 0 or more characters in a single path portion
* `?` Matches 1 character
* `[...]` Matches a range of characters, similar to a RegExp range.
If the first character of the range is `!` or `^` then it matches
any character not in the range.
* `!(pattern|pattern|pattern)` Matches anything that does not match
any of the patterns provided.
* `?(pattern|pattern|pattern)` Matches zero or one occurrence of the
patterns provided.
* `+(pattern|pattern|pattern)` Matches one or more occurrences of the
patterns provided.
* `*(a|b|c)` Matches zero or more occurrences of the patterns provided
* `@(pattern|pat*|pat?erN)` Matches exactly one of the patterns
provided
* `**` If a "globstar" is alone in a path portion, then it matches
zero or more directories and subdirectories searching for matches.
It does not crawl symlinked directories.
