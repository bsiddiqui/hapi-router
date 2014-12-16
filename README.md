hapi-router [![Build Status](https://travis-ci.org/bsiddiqui/hapi-router.svg?branch=master)](https://travis-ci.org/bsiddiqui/hapi-router) [![Code Climate](https://codeclimate.com/github/bsiddiqui/hapi-router/badges/gpa.svg)](https://codeclimate.com/github/bsiddiqui/hapi-router) [![Test Coverage](https://codeclimate.com/github/bsiddiqui/hapi-router/badges/coverage.svg)](https://codeclimate.com/github/bsiddiqui/hapi-router) [![npm version](https://badge.fury.io/js/hapi-router.svg)](http://badge.fury.io/js/hapi-router)
==========

Opinionated route loader for [hapi](https://github.com/spumko/hapi).

## Setup

```bash
$ npm install hapi-router
```

```js
server.register({
  register: require('hapi-router')
  options: { routesDir: __dirname + '/routes/' }
}, function (err) {
  if (err) throw err;
});
```

## Options

The following required `options` should be provided at registration:
* `routesDir`: the path to your routes directory

## Specifying Routes
Any `.js` files in your routes directory will be loaded - supports nested routes

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
