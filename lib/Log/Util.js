var loader         = require(__dirname+'/../Loader')('Log/Util');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services;
    utils          = loader.utils;
    interface      = loader.interfaces;

var Log = {
    error: modules.winston.error,
    warn: modules.winston.warn,
    info: modules.winston.info,
    log: modules.winston.log,
    verbose: modules.winston.verbose,
    debug: modules.winston.debug,
    silly: modules.winston.silly,
    display_errors: function(level){
        modules.winston.level = level;
    }
};

module.exports = Log;
