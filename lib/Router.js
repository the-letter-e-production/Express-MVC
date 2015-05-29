var loader         = require(__dirname+'/Loader')('Router');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services;
    interface      = loader.interfaces;
var Router = function(){
    var _this = this;

    var Route   = function(method, path, interface){
        this.method = method || 'GET';
        this.path   = path || '/';
        this.interface = interface;
    };

    this.routes = {};

    this.addRoute = function(name, method, path, interface){
        _this.routes[name] = new Route(method, path, interface);
    };

    this.deleteRoute = function(name){
        delete _this.routes[name];
    };

    this.load = function(app){
        for(var key in _this.routes){
            var controller;
            if( typeof _this.routes[key].interface === "undefined" ){
                controller = interface.controller;
            }else if( typeof _this.routes[key].interface === "function" ){
                controller = _this.routes[key].interface;
            }else{
                controller = require(_this.routes[key].interface);
            }
            app[_this.routes[key].method.toLowerCase()](_this.routes[key].path, controller);

            return app;
        }
    };
};

module.exports = Router;
