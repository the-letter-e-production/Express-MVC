var loader         = require(__dirname+'/Loader')('Router');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services;
    interface      = loader.interfaces;
var Router = function(){
    var _this = this;

    var ExpressRouter = modules.express.Router();

    var Route   = function(method, path, interface){
        this.method = method || 'GET';
        this.path   = path || '/';
        this.interface = interface;
    };

    this.routes = [];

    this.use = function(){
        ExpressRouter.use.apply(ExpressRouter, arguments);
    };

    this.addRoute = function(method, path, interface){
        _this.routes.push(new Route(method, path, interface));

        return _this;
    };

    this.load = function(app){
        for(var i=0; i<_this.routes.length; i++){
            var controller;
            var key = i;
            if( typeof _this.routes[key].interface === "undefined" ){
                controller = interface.controller;
            }else if( typeof _this.routes[key].interface === "function" ){
                controller = _this.routes[key].interface;
            }else{
                 controller = require(process.cwd()+_this.routes[key].interface);
                if( typeof controller !== "function" ){
                    controller = controller[_this.routes[key].method];
                }
            }
            ExpressRouter[_this.routes[key].method.toLowerCase()](_this.routes[key].path, controller);

        }
        
        app.use('/', ExpressRouter);

        
        return app;
    };
};

module.exports = Router;
