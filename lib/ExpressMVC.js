var loader          = require(__dirname+'/Loader')('ExpressMVC');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;
var ExpressMVC      = {
    App: object.app,
    Router: object.router,
    Util: utils
};

module.exports = ExpressMVC;
