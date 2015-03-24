'use strict';

var chai   = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var Hapi    = require('hapi');

describe('hapi-router', function () {
  var server;

  beforeEach(function () {
    server = new Hapi.Server();
    server.connection();
  });

  function register (options) {
    server.register({
      register: require('../'),
      options: options
    }, function (err) {
      if (err) throw err;
    });
  }

  it('can load routes recursively', function () {
    register({
      routes: 'test/routes/**/*.js'
    });

    expect(server.connections[0].table()).to.have.length(2);
  });

  it('can ignore specific routes', function () {
    register({
      routes: 'test/routes/**/*.js',
      ignore: 'test/routes/**/*1.js'
    });

    expect(server.connections[0].table()).to.have.length(1);
  });

  it('can match specific routes', function () {
    register({
      routes: 'test/routes/**/*2.js'
    });

    expect(server.connections[0].table()).to.have.length(1);
  });
});
