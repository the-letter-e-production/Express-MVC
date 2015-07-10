var loader          = require(__dirname+'/Loader')('App');
var morgan          = require('morgan');
var fs              = require('fs');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
var App = function(options){
    var app  = modules.express();

    if( options.access_logging ){
        if( options.access_log_dir ){
            var accessLogStream = fs.createWriteStream(options.access_log_dir + '/access.log', {flags: 'a+'});
        }else{
            var accessLogStream = fs.createWriteStream(process.cwd() + '/logs/access.log', {flags: 'a+'});
        }
        app.use(morgan('combined', {stream: accessLogStream}));
    }

    if( options.trust_proxy ){
        app.set('trust proxy', 'uniquelocal');
    }

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
