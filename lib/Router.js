var loader         = require(__dirname+'/Loader')('Router');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services,
    utils          = loader.utils,
    interface      = loader.interfaces;

/**
 * Router Object
 * 
 * @class
 * @param {string} [path] - Mount path, if ommited then '/' is used
 * @return {Router}
 * @example
 * var router = new ExpressMVC.Router('/');
 */
var Router = function(path){
    /** @type {Router} */
    var _this = this;
    /** @type {string} */
    var path = path || '/';

    /**
     * Extends Express Router
     *
     * @type {Express_Router}
     */
    var ExpressRouter = modules.express.Router();

    /**
     * Route Object
     *
     * @class
     * @param {string} [method] - HTTP Request method (GET, POST, etc...)
     * @param {string} [path] - Mount path
     * @param {string|function} [interface] - Path to controller, controller function,
     * if ommited magic controllers used
     * @return null;
     * @example
     * var route = new router.Route('GET', '/', function(req, res){});
     */
    this.Route   = function(method, path, interface){
        this.method = method || 'GET';
        this.path   = path || '/';
        this.interface = interface;
    };

    /**
     * Extends Express Router.use
     * 
     * @param {string} [path] - Mount path
     * @param {function} [function] - Middleware handler
     * @return {Router}
     * @example
     * router.use('/', function(req, res, next){});
     */
    this.use = function(){
        ExpressRouter.use.apply(ExpressRouter, arguments);
    
        return _this;
    };

    /**
     * Add a route to the router
     *
     * @param {Router.Route} - Instance of a route
     * @return {Router}
     * @example
     * router.addRoute(route);
     */
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

    /**
     * Expose Router to attach to Express
     *
     * @return {array} - [path, ExpressRouter]
     */ 
    this.attach = function(){
        return [path, ExpressRouter];
    };

    return this;
};

module.exports = Router;
