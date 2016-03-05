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
    google_logger: function(){
        return new modules.winston.transports.Console({
            json: false,
            colorize: false,
            formatter: function(options) {
                return JSON.stringify({
                    message: options.message,
                    severity: options.level.toUpperCase()
                });
            }
        });
    },
    request_logger: function(google){
        google = google || false;
        var transports = [];
        if( google ){
            transports.push(this.google_logger());
        }else{
            transports.push(this.create_logger({
                json: false,
                colorize: false
            }));
        }
        var requestLogger = new modules.winston.Logger({
            transports: transports,
            exitOnError: false,
            meta: false,
            levels: {
                default: 0,
                debug: 1,
                info: 2,
                notice: 3,
                warning: 4,
                error: 5,
                critical: 6,
                alert: 7,
                emergency: 8
            }
        });

        return requestLogger;
    },
    morgan_parser: function(options){
        var logger = options.custom_logger || this.request_logger(options.google_logs);
        return {
            write: function(message, encoding){
                logger.info(message);
            }
        };
    }
};

module.exports = Log;
