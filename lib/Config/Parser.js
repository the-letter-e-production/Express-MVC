var loader          = require(__dirname+'/../Loader')('Config/Parser');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;
/**
 * Parse App Configs
 *
 * @param {App} app - App instance
 * @param {object} options - Options object
 * @return {App}
 * @example
 * app = config_parser(app, {});
 */
var Config_Parser = function(app, options) {
     process.env.GOOGLE_LOGGING = options.google_logs || false;
     utils.log.display_errors(options.log_severity_level || process.env.LOGGING_LEVEL || 'info');
     utils.log.debug(JSON.stringify(options));
	 if( options.access_logging ){
        if( options.access_log_dir ){
	 	    var fs = require("fs");
            var accessLogStream = fs.createWriteStream(options.access_log_dir + '/access.log', {flags: 'a+'});
            app.use(modules.morgan('combined', {stream: accessLogStream}));
        }else{
            app.use(modules.morgan('combined', {stream: utils.log.morgan_parser(options)})); 
        }
    }

    if( options.parse_body ){
        var bodyParser = require('body-parser');
        if( options.parse_body.hasOwnProperty('json') ){
            app.use(bodyParser.json());
        }
        if( options.parse_body.hasOwnProperty('urlencoded') ){
            app.use(bodyParser.urlencoded(options.parse_body.urlencoded));
        }
    }

    if( options.trust_proxy ){
       	app.set('trust proxy', 'uniquelocal');
    }

    return app;
}

module.exports = Config_Parser;
