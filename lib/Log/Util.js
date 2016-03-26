var loader         = require(__dirname+'/../Loader')('Log/Util');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services,
    utils          = loader.utils,
    interface      = loader.interfaces;

/**
 * Log Util - Static Class
 *
 * @class
 */
var Log = {
    /**
     * Error log method
     *
     * @param {...*} message - Message to log
     */
    error: function(){ this.get_logger().error.apply(this.get_logger(), arguments); },
    /**
     * Warning log method
     *
     * @param {...*} message - Message to log
     */
    warn: function(){ this.get_logger().warning.apply(this.get_logger(), arguments); },
    /**
     * Info log method
     *
     * @param {...*} message - Message to log
     */
    info: function(){ this.get_logger().info.apply(this.get_logger(), arguments); },
    /**
     * Default log method
     *
     * @param {...*} message - Message to log
     */
    log: function(){ this.get_logger().default.apply(this.get_logger(), arguments); },
    /**
     * Verbose log method
     *
     * @param {...*} message - Message to log
     */
    verbose: function(){ this.get_logger().notice.apply(this.get_logger(), arguments); },
    /**
     * Debug log method
     *
     * @param {...*} message - Message to log
     */
    debug: function(){ this.get_logger().debug.apply(this.get_logger(), arguments); },
    /**
     * Silly log method
     *
     * @param {...*} message - Message to log
     */
    silly: function(){ this.get_logger().default.apply(this.get_logger(), arguments); },
    /**
     * Set error display level
     *
     * @param {string} level - Least severe log to show
     */
    display_errors: function(level){
        process.env.LOGGING_LEVEL = level;
    },
    /**
     * Get a default winston logger
     *
     * @return {Winston_Logger}
     */
    get_logger: function(){
        var transport;
        if( process.env.GOOGLE_LOGGING == "true" ){
            transport = this.google_transport();
        }else{
            transport = this.default_transport();
        }

        return this.default_logger([transport]);
    },
    /**
     * Create a custom winston logger
     *
     * @param {object} options - Winston options (https://www.npmjs.com/package/winston#instantiating-your-own-logger)
     * @return {Winston_Logger}
     */
    create_logger: function(options){
        var custom_logger = new modules.winston.Logger(options);

        return custom_logger;
    },
    /**
     * Default winston logger store
     *
     * @param {array} transports - Transports to use with the logger
     * @return {Winston_Logger}
     */
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
    /**
     * Default winston transport
     *
     * @return {Winston_Transports_Console}
     */
    default_transport: function(){
        return new modules.winston.transports.Console({
            json: false,
            colorize: false
        });
    },
    /**
     * Google winston transport
     *
     * @return {Winston_Transports_Console}
     */
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
    /**
     * Logger for http requests - Access logging
     *  
     * @return {Winston_Logger}
     */
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
    /**
     * Logger to parse morgan access logs vi Winston
     *
     * @return {object}
     */
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
