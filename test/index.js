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

  it('can load routes', function () {
    register({
      routesDir: __dirname + '/routes/'
    });

    expect(server.table()).to.have.length(2);
  });
});
