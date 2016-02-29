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
        //format: 54.183.156.55 - - [02/Mar/2016:12:26:08 -0800] "GET /v1/partner/channel?site=jobseeq.com&user_type=organic&device_type=mobile HTTP/1.1" 200 282 http://jobseeq.com/ "Mozilla/5.0 (Linux; Android 4.1.2; Z740G Build/JZO54K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Mobile Safari/537.36" "imperial-signer-658.appspot.com" ms=289 cpu_ms=273 cpm_usd=3.1515e-8 instance=00c61b117c69477a0f0eff6c9fcb97f23e74b316 app_engine_release=1.9.33 trace_id=-
        var requestMiddleware = modules.express_winston.logger({
          transports: [
            new modules.winston.transports.Console({
                json: false,
                colorize: false,
                timestamp: modules.moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'),
                formatter: function(options){
                    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    return ip + ' - - [' + options.timestamp + '] "' + options.meta.req.method  + ' ' + options.meta.req.originalUrl  + ' HTTP/' + options.meta.req.httpVersion  + '" ' + options.meta.res.statusCode + ' ' + (process.env.SSL ? 'https' : 'http') + '://' + options.meta.req.headers.host +  ' "' + options.meta.req.headers['user-agent'] + '" "' + options.meta.req.headers.host  + '" ms=' + options.meta.responseTime;
                }
            })
          ],
          expressFormat: true,
          meta: true
        });

        return requestMiddleware(req, res, next);
    }
};

module.exports = Log;
