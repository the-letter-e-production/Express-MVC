var loader          = require(__dirname+'/../Loader')('Exception/Util');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;

var emvc_exceptions = {
    default: require('./Default'),
    database: require('./Database'),
    http: require('./Http'),
};
var Exception_Util = {
    factory: function(type, message, code, scope, safe){
        if( emvc_exceptions.hasOwnProperty(type.toLowerCase()) ){
            return new emvc_exceptions[type.toLowerCase()](message, code, scope, safe);
        }
        return new (require(utils.dir.approot()+'/exceptions/'+type))(message, code, scope, safe);
    },
    middleware: function(err, req, res, next){
        var exception = err;
        utils.log.error('Caught ' + exception.name + ': ' + exception.message + "\n" + exception.stack);
        if( exception.hasOwnProperty('scope') && exception.scope == 'public' ){
            res.status(exception.code);
            res.write(JSON.stringify({'response': 'error', 'message': exception.message.toString()}));
            res.end();
            if( !exception.is_safe() ){
                process.exit();
            }
        }else{
            if( exception.hasOwnProperty('is_safe') && exception.is_safe() ){
                res.status(500);
                res.write(JSON.stringify({'response': 'error', 'message': 'An error occurred! Please let us know if this problem persists.'}));
                res.end();
            }else{
                try{
                    res.status(500);
                    res.write(JSON.stringify({'response': 'error', 'message': 'An error occurred! Please let us know if this problem persists.'}));
                    res.end();
                }catch(e){
                    utils.log.error(e);
                }
                process.exit();
            }
        }
    }
};

module.exports = Exception_Util;
