var loader          = require(__dirname+'/Loader')('ExpressMVC');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services;
    object          = loader.objects;
var ExpressMVC      = function(options){
    this.options    = modules.extend(true, config.options, options);

    this.Router     = object.router;
    this.Listen     = object.listen;
};

module.exports = ExpressMVC;
