define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    var q = require('intern/dojo/node!q');

    var http = require('intern/dojo/node!http');
    var request = require('intern/dojo/node!request');
    var ExpressMVC = require('intern/dojo/node!../../../index');
    var app = new ExpressMVC.App({
        port: 3000,
        access_logging: true,
        access_log_dir: '/tmp',
	    parse_body: {
       	    json: true,
            urlencoded: {
                extended: true
            }
        }
    });
    var router;
    var route;
    var server;
    registerSuite({
        name: 'Express MVC Server',
        'Use Middleware': function(){
            assert.instanceOf(app.use(function(req, res, next){next();}), ExpressMVC.App);
        },
        'Set Value': function(){
            assert.instanceOf(app.set('foo', 'bar'), ExpressMVC.App);
        },
        'Set Static Path': function(){
            assert.instanceOf(app.static('/foo', './bar'), ExpressMVC.App);
        },
        'Create Router': function(){
            router = new ExpressMVC.Router('/');
            assert.instanceOf(router, ExpressMVC.Router);
        },
        'Create A Route': function(){
            route = new router.Route('GET', '/', function(req, res, next){
                res.write('It worked!');
                res.end();
            });

            assert.instanceOf(route, router.Route);
        },
        'Add Route to Router': function(){
            assert.instanceOf(router.addRoute(route), ExpressMVC.Router);
        },
        'Add Router to App': function(){
            assert.instanceOf(app.addRouter(router), ExpressMVC.App);
        },
        'Binding Checks': {
            'Unrestricted IP': function(){
                var app = new ExpressMVC.App({
                    port: 3000,
                    access_logging: false
                });
                app.addRouter(router);

                var server = app.listen();
                
                var deferred = q.defer();

                request({
                    method: 'GET',
                    url: 'http://localhost:3000/'
                }, function(err, res, body){
                    server.close();
                    if( err ){
                        deferred.reject(err);
                    }
                    if( body != "It worked!" ){
                        deferred.reject('Invalid body text returned!');
                    }

                    deferred.resolve(true);
                });

                return deferred.promise;
            },
            'Restricted IP': function(){
                var app = new ExpressMVC.App({
                    port: 3000,
                    access_logging: false,
                    ip: '127.0.0.2'
                });
                app.addRouter(router);

                var server = app.listen();
                
                var deferred = q.defer();

                request({
                    method: 'GET',
                    url: 'http://127.0.0.2:3000/'
                }, function(err, res, body){
                    server.close();
                    if( err ){
                        deferred.reject(err);
                    }
                    if( body != "It worked!" ){
                        deferred.reject('Invalid body text returned!');
                    }

                    deferred.resolve(true);
                });

                return deferred.promise;
            }
        }
    });
});
