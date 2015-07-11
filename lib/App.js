var loader          = require(__dirname+'/Loader')('App');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
var App = function(options){
    var app  = modules.config_parser(modules.express(), options);

    this.use = function(middleware){
        app.use(middleware);
    };

    this.listen = function(router, port){
        var port = port || 3000;
        app  = router.load(app);
        if( options.bubble_unhandled === true || typeof options.exception_handler === 'function' ){
           var server = modules.http.createServer(function (req, res) {
                if( options.bubble_unhandled == true ){
                    app(req, res, function(err){
                        if(err){
                            throw err;
                        }
                        res.status(404);
                        res.write(JSON.stringify({'response': 'error', 'message': 'Invalid path!', 'method': req.method, 'url': req.originalUrl || req.url}));
                        res.end();
                    });
                }else{
                    app(req, res, options.exception_handler);
                }
            });
            server.listen(port, function(){
                console.log('ExpressMVCB Started Listening on Port '+port+'...');
            });
        }else{
            app.listen(port, function(){
                console.log('ExpressMVC Started Listening on Port '+port+'...');
            });
        }
    };

    return this;
};

module.exports = App;
