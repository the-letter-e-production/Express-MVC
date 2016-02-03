var loader          = require(__dirname+'/Loader')('ExpressMVC');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
    object          = loader.objects;
    utils           = loader.utils;
var ExpressMVC      = {
    App: function(options){ return object.app(modules.extend(true, config.options, options)); },
    Router: object.router,
    Util: utils
};

module.exports = ExpressMVC;
