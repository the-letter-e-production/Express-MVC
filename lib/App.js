var loader          = require(__dirname+'/Loader')('App');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
var App = function(options){
    var app  = modules.config_parser(modules.express(), options);

    this.use = function(middleware){
        app.use(middleware);
    };

    this.set = function(key, val){
        app.set(key, val);
    };

    this.static = function(path, mount){
        if( typeof mount == "undefined" ){
            app.use(modules.express.static(path));
        }else{
            app.use(mount, modules.express.static(path));
        }
    };

    this.listen = function(router, port, ip){
        var port = port || 3000;
        var ip = ip || '127.0.0.1';
        app  = router.load(app);
        if( options.bubble_unhandled === true ){
           var server = modules.http.createServer(function (req, res) {
                app(req, res, function(err){
                    if(err){
                        throw err;
                    }
                    res.status(404);
                    res.write(JSON.stringify({'response': 'error', 'message': 'Invalid path!', 'method': req.method, 'url': req.originalUrl || req.url}));
                    res.end();
                });
            });
            server.listen(port, ip, function(){
                console.log('ExpressMVC (Bubble Errors) Started Listening on Port '+port+'...');
            });
        }else{
            app.listen(port, ip, function(){
                console.log('ExpressMVC Started Listening on Port '+port+'...');
            });
        }
    };

    return this;
};

module.exports = App;
