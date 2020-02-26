const RestProxy = require('sp-rest-proxy');

const settings = {
  port: 8081
};

const restProxy = new RestProxy(settings);
restProxy.serve();