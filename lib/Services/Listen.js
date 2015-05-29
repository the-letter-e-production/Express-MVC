var loader          = require('../Loader')('ListenService');
var modules         = loader.modules,
    configs         = loader.configs,
    services        = loader.services;
var ListenService = function(router, port){
    var port = port || 3000;
    var app  = modules.express();
        app  = utilities.RouterUtility.parseRoutes(router, app);
    return app.listen(port, function(){
        console.log('ExpressMVC Started Listening on Port '+port+'...');
    });
};
