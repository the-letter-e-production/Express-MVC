var loader          = require(__dirname+'/Loader')('App');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
var App = function(options){
    var _this = this;
    options = modules.extend(true, config.options, options)
    var app  = modules.config_parser(modules.express(), options);

    this.use = function(middleware){
        app.use(middleware);
    
        return _this;
    };

    this.set = function(key, val){
        app.set(key, val);
    
        return _this;
    };

    this.static = function(path, mount){
        if( typeof mount == "undefined" ){
            app.use(modules.express.static(path));
        }else{
            app.use(mount, modules.express.static(path));
        }

        return _this;
    };

    this.addRouter = function(router){
        app.use.apply(app, router.attach());

        return _this;
    };

    this.listen = function(router){
        var port = options.port || 3000;
        var ip = options.ip;
        if( typeof ip == "undefined" ){
            return app.listen(port, function(){
                console.log('ExpressMVC Started Listening on Port '+port+'...');
            });
        }
        
        return app.listen(port, ip, function(){
            console.log('ExpressMVC Started Listening on Port '+port+'...');
        });
    };

    return this;
};

module.exports = App;
