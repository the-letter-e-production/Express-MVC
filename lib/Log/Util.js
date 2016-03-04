var loader         = require(__dirname+'/../Loader')('Log/Util');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services,
    utils          = loader.utils,
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
    },
    create_logger: function(options){
        var custom_logger = new modules.winston.Logger(options);

        return custom_logger;
    },
    request_logger: function(){
        var requestLogger = new modules.winston.Logger({
            transports: [
                new modules.winston.transports.Console({
                    json: false,
                    colorize: false
                })
            ],
            exitOnError: false,
            meta: false
        });

        return requestLogger;
    }
};

module.exports = Log;
