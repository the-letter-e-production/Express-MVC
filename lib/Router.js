var loader         = require(__dirname+'/Loader')('Router');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services;
    utils          = loader.utils;
    interface      = loader.interfaces;
var Router = function(path){
    var _this = this;
    var path = path || '/';


    var ExpressRouter = modules.express.Router();

    this.Route   = function(method, path, interface){
        this.method = method || 'GET';
        this.path   = path || '/';
        this.interface = interface;
    };

    this.routes = [];

    this.use = function(){
        ExpressRouter.use.apply(ExpressRouter, arguments);
    };

    this.addRoute = function(route){
        if( typeof route.interface === "undefined" ){
            controller = interface.controller;
        }else if( typeof route.interface === "function" ){
            controller = route.interface;
        }else{
             controller = require(utils.dir.approot()+route.interface);
            if( typeof controller !== "function" ){
                controller = controller[route.method];
            }
        }
        ExpressRouter[route.method.toLowerCase()](route.path, controller);

        return _this;
    };

    this.attach = function(){
        return [path, ExpressRouter];
    };
};

module.exports = Router;
