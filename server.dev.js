/**
 * @file server.dev.js
 * @author lavas
 */

var LavasCore = require('lavas-core-vue');
var express = require('express');
var stoppable = require('stoppable');
var proxy = require('http-proxy-middleware');


var configPath = './lavas.config.js';
// fix https://github.com/lavas-project/lavas/issues/50
if (process.argv.length >= 3 && process.argv[2] !== 'dev') {
    configPath = process.argv[2];
}

/**
 * API Proxy Configuration
 *
 * @see https://github.com/chimurai/http-proxy-middleware
 * @type {Object}
 */
var proxyTable = {
    '/api': {
        target: 'http://192.168.2.32:7000',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
    },
    '/auth': {
        target: 'http://192.168.2.32:7000',
        changeOrigin: true,
        pathRewrite: { '^/auth': '/auth' }
    },
};

var port = process.env.PORT || 4000;
var core = new LavasCore(__dirname);
var app;
var server;

process.env.NODE_ENV = 'development';

/**
 * start dev server
 */
function startDevServer() {
    app = express();
    core.build()
        .then(function () {
            // API Proxying during development
            Object.keys(proxyTable).forEach(function (pattern) {
                app.use(pattern, proxy(proxyTable[pattern]));
            });

            app.use(core.expressMiddleware());

            /**
             * server.close() only stop accepting new connections,
             * we need to close existing connections with help of stoppable
             */
            server = stoppable(app.listen(port, function () {
                console.log('server started at localhost:' + port);
            }));
        })
        .catch(function (err) {
            console.log(err);
        });
}

/**
 * every time lavas rebuild, stop current server first and restart
 */
core.on('rebuild', function () {
    core.close().then(function () {
        server.stop();
        startDevServer();
    });
});

core.init(process.env.NODE_ENV, true, {configPath})
    .then(function () {
        startDevServer();
    });

// catch promise error
process.on('unhandledRejection', function (err) {
    console.warn(err);
});

