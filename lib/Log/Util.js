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
    },
    request_logger: function(){
        var requestLogger = new modules.winston.Logger({
            transports: [
                new modules.winston.transports.Console({
                    json: false,
                    colorize: true  
                })
            ],
            exitOnError: false,
            meta: false
        });

        return requestLogger;
    },
    request_middleware: function(){
        var requestMiddleware = modules.express_winston.logger({
          transports: [
            new modules.winston.transports.Console({
              json: false,
              colorize: true
            })
          ],
          expressFormat: true,
          meta: false
        });

        return requestMiddleware;
    }
};

module.exports = Log;
