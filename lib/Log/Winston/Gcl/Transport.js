var loader         = require(__dirname+'/../../../Loader')('Log/Winston/Gcl/Transport');
var modules        = loader.modules,
    config         = loader.configs,
    service        = loader.services;
    utils          = loader.utils;
    interfaces      = loader.interfaces;

var Log_Winston_Gcl_Transport = function(options){
    this.name = 'GcLogger';
    this.level = options.level || 'DEFAULT';
    this.jwt = false;
};

utils.util.inherits(Log_Winston_Gcl_Transport, modules.winston.Transport);

Log_Winston_Gcl_Transport.prototype.send_to_gcl = function(level, msg, meta, callback){
    var metadata = {
        projectId: config.google.logging.project_id,
        severity: level,
        serviceName: config.google.logging.service_name,
        region: config.google.logging.region,
        zone: config.google.logging.zone,
        labels: config.google.logging.labels || {}
    };
    var http_request = {
        "requestMethod": 'GET',
        "requestUrl": '/',
        "requestSize": 120,
        "status": 200,
        "responseSize": null,
        "userAgent": null,
        "remoteIp": '192.168.56.1',
        "referer": null
    };
    var operation = {
        "id": '1',
        "producer": 'node1',
        "first": true,
        "last": true,
    };
    var struct_payload = {
        'foo': 'bar'
    };
    var logging = modules.googleapis.logging('v2beta1');
    logging.entries.write({
        auth: this.jwt,
        resource: {
            /*entries: [{
                "metadata": metadata,
                httpRequest: http_request,
                operation: operation,
                textPayload: "test"
            }]*/
            entries:[{
  "metadata": {
    serviceName: 'bigquery.googleapis.com'
  },
  "log": "test",
  "httpRequest": {
   
  },
  "operation": {
    
  },
  "structPayload": {
  },
}]
        }
    }, function(err, res){
        console.log('RES:', err, res);
        if( err ){
            return callback(err);
        }

        return callback(null, true);
    });     
};

Log_Winston_Gcl_Transport.prototype.log = function(level, msg, meta, callback){
    var _this = this;
    if( this.jwt && (this.jwt.credentials.expiry_date > modules.moment().add(62, 'minutes').valueOf())){
        this.send_to_gcl(level, msg, meta, callback);
    }else{
        console.log(config.google);
        var jwt = new modules.googleapis.auth.JWT(
                    config.google.logging.service_account.email, 
                    null, 
                    config.google.logging.service_account.key,
                    ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/logging.admin', 'https://www.googleapis.com/auth/logging.write']
        );

        jwt.authorize(function(err, tokens){
            if( err ){
                console.log(err);
                throw utils.exception.factory('default', 'Google auth error!');
            }

            _this.jwt = jwt;
            _this.send_to_gcl(level, msg, meta, callback);
        });
    }
};


module.exports = Log_Winston_Gcl_Transport;
