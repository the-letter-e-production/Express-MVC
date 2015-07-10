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
        app.listen(port, function(){
            console.log('ExpressMVC Started Listening on Port '+port+'...');
        });
    };

    return this;
};

module.exports = App;
