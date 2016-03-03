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
    },
    request_middleware: function(req, res, next){
        modules.winston.transports.GcLogger = modules.winston_gcl_transport;
        var test = new modules.winston.transports.GcLogger({json: false, colorize: false});
        var requestLogger = new modules.winston.Logger({
            transports: [
                new modules.winston.transports.GcLogger({
                    json: false,
                    colorize: false
                })
            ],
            levels: {
                'DEFAULT': 0,
                'DEBUG': 1,
                'INFO': 2,
                'NOTICE': 3,
                'WARNING': 4,
                'ERROR': 5,
                'CRITICAL': 6,
                'ALERT': 7,
                'EMERGENCY': 8
            }
        });
       
        requestLogger.log('DEFAULT', 'test');        
        next();
    }
};

module.exports = Log;
