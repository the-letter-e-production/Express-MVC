var loader          = require(__dirname+'/../Loader')('Config/Parser');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;
var Config_Parser = function(app, options) {
     utils.log.display_errors(options.display_errors || 'info');
     utils.log.debug(options, true);
	 if( options.access_logging ){
        if( options.access_log_dir ){
	 	    var fs = require("fs");
            var accessLogStream = fs.createWriteStream(options.access_log_dir + '/access.log', {flags: 'a+'});
            app.use(modules.morgan('combined', {stream: accessLogStream}));
        }else{
            var logger = utils.log.request_logger();
            console.log(logger.toString());
            app.use(modules.morgan('combined', {stream: {write: function(message, encoding){
                logger.info(message);
            }}}));
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
