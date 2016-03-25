var loader          = require(__dirname+'/Loader')('App');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    utils           = loader.utils;
/**
 * ExpressMVC App Object
 *
 * @class
 * @param {object} options - App config options, extends defaults
 * @return {App}
 * @example
 * var app = new ExpressMVC.App({});
 */
var App = function(options){
     /** @type {App} */
    var _this = this;
    /** @type {object} */
    options = modules.extend(true, config.options, options)
    /** @type {Express} */
    var app  = modules.config_parser(modules.express(), options);

    /**
     * Extends Express.use
     * 
     * @param {string} [mount] - Mount path
     * @param {function} middleware - Middlware handler
     * @return {App} 
     * @example
     * app.use('/', function(req, res, next){});
     */
    this.use = function(){
        app.use.apply(app, arguments);
    
        return _this;
    };

    /**
     * Extends Express.set
     *
     * @param {string} name - Name from app settings table (http://expressjs.com/en/4x/api.html#app.settings.table)
     * @param {string|boolean|number|array} value - Setting value
     * @return {App}
     * @example
     * app.set('view engine', 'ejs');
     */
    this.set = function(){
        app.set.apply(app, arguments);
    
        return _this;
    };

    /**
     * Add a router to the app
     *
     * @param {Router} router - Router instance
     * @return {App}
     * @example
     * app.addRouter(router);
     */
    this.addRouter = function(router){
        app.use.apply(app, router.attach());

        return _this;
    };

    /**
     * Listen for connections on desired port
     *
     * @param {function} cb - Callback after app starts listening
     * @return {function} - Returns instance of httpServer
     * @example
     * app.listen(function(){ console.log('We are listening!'); });
     */
    this.listen = function(cb){
        var port = options.port || 3000;
        var ip = options.ip;
        var cb = cb || function(){utils.log.info('ExpressMVC', options.ssl == true ? '(SSL)':'', 'Started Listening on Port '+port+'...');};
        var listen_args = [];
            listen_args.push(port);
            if( typeof ip !== "undefined" ){
                listen_args.push(ip);
            }
            listen_args.push(cb);
        utils.log.debug(listen_args);
        if( typeof options.ssl != "undefined" && options.ssl == true ){
            var https = require('https');
            var server = https.createServer({
                key: options.ssl_key,
                cert: options.ssl_cert
            }, app);
            
            return server.listen.apply(server, listen_args);
        }else{
            return app.listen.apply(app, listen_args);
        }
    };

    return this;
};

module.exports = App;
