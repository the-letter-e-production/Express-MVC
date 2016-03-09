var loader         = require(__dirname+'/../Loader')('Log/Util');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services,
    utils          = loader.utils,
    interface      = loader.interfaces;
var Log = {
    error: function(){ this.get_logger().error.apply(this.get_logger(), arguments); },
    warn: function(){ this.get_logger().warning.apply(this.get_logger(), arguments); },
    info: function(){ this.get_logger().info.apply(this.get_logger(), arguments); },
    log: function(){ this.get_logger().default.apply(this.get_logger(), arguments); },
    verbose: function(){ this.get_logger().notice.apply(this.get_logger(), arguments); },
    debug: function(){ this.get_logger().debug.apply(this.get_logger(), arguments); },
    silly: function(){ this.get_logger().default.apply(this.get_logger(), arguments); },
    display_errors: function(level){
        process.env.LOGGING_LEVEL = level;
    },
    get_logger: function(){
        var transport;
        if( process.env.GOOGLE_LOGGING == "true" ){
            transport = this.google_transport();
        }else{
            transport = this.default_transport();
        }

        return this.default_logger([transport]);
    },
    create_logger: function(options){
        var custom_logger = new modules.winston.Logger(options);

        return custom_logger;
    },
    default_logger: function(transports){
        return new modules.winston.Logger({
            transports: transports,
            meta: false,
            level: process.env.LOGGING_LEVEL,
            levels: {
                default: 8,
                debug: 7,
                info: 6,
                notice: 5,
                warning: 4,
                error: 3,
                critical: 2,
                alert: 1,
                emergency: 0
            }
        });
    },
    default_transport: function(){
        return new modules.winston.transports.Console({
            json: false,
            colorize: false
        });
    },
    google_transport: function(){
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
            transports.push(this.google_transport());
        }else{
            transports.push(this.default_transport());
        }

        return this.default_logger(transports);
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
