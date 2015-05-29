var loader          = require('./Loader')('ExpressMVC');
var modules         = loader.modules,
    configs         = loader.configs,
    services        = loader.services;
var ExpressMVC      = function(options){
    this.options    = modules.extend(true, configs.options, options);

    this.Router     = services.router;
    this.Listen     = services.listen;
};

var emvc = new ExpressMVC({});
