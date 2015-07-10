var loader          = require(__dirname+'/Loader')('App');
var morgan          = require('morgan');
var fs              = require('fs');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
var App = function(options){
    var app  = modules.express();
    var accessLogStream = fs.createWriteStream(global._MY.log_dir + '/access.log', {flags: 'a+'});
        app.set('trust proxy', 'uniquelocal');
        app.use(morgan('combined', {stream: accessLogStream}));

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
