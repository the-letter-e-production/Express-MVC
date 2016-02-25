var loader          = require(__dirname+'/../Loader')('Config/Parser');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;
var Config_Parser = function(app, options) {
	 if( options.access_logging ){
	 	var morgan = require("morgan");
        console.log(options);
        if( options.access_log_dir ){
	 	    var fs = require("fs");
            var accessLogStream = fs.createWriteStream(options.access_log_dir + '/access.log', {flags: 'a+'});
            app.use(morgan('combined', {stream: accessLogStream}));
        }else{
            app.use(morgan('combined'));
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
