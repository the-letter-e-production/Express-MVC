var loader          = require(__dirname+'/Loader')('Listen');
var morgan          = require('morgan');
var fs              = require('fs');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
var Listen = function(router, port){
    var port = port || 3000;
    var app  = modules.express();
    var accessLogStream = fs.createWriteStream('/srv/www/leaders/current/log/access.log', {flags: 'a+'});
        app.use(morgan('combined', {stream: accessLogStream}));
        app  = router.load(app);
    return app.listen(port, function(){
        console.log('ExpressMVC Started Listening on Port '+port+'...');
    });
};

module.exports = Listen;
