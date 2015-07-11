var Config_Parser = function(app, options) {
	 if( options.access_logging ){
	 	var fs = require("fs");
	 	var morgan = require("morgan");

        if( options.access_log_dir ){
            var accessLogStream = fs.createWriteStream(options.access_log_dir + '/access.log', {flags: 'a+'});
        }else{
            var accessLogStream = fs.createWriteStream(process.cwd() + '/logs/access.log', {flags: 'a+'});
        }
        app.use(morgan('combined', {stream: accessLogStream}));
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
