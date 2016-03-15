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
    middleware_template: function(exception, message){
        return 'Error: ' + (message || exception.message.toString());
    },
    set_middleware_template: function(template){
        this.middleware_template = template
    },
    get_middleware_template: function(){
        return this.middleware_template.apply(this, arguments);
    },
    middleware: function(err, req, res, next){
        var exception = err;
        if( exception.hasOwnProperty('is_safe') && exception.is_safe() ){
            utils.log.warn('Caught ' + exception.name + ': ' + exception.message + "\n" + exception.stack);
        }else{
            utils.log.error('Caught ' + exception.name + ': ' + exception.message + "\n" + exception.stack);
        }
        if( exception.hasOwnProperty('scope') && exception.scope == 'public' ){
            if( !res.headersSent ){
                res.status(exception.code);
                res.write(Exception_Util.get_middleware_template(exception));
                res.end();
            }
            if( !exception.is_safe() ){
                process.exit();
            }
        }else{
            if( exception.hasOwnProperty('is_safe') && exception.is_safe() && !res.headersSent ){
                res.status(500);
                res.write(Exception_Util.get_middleware_template(exception, 'An error occurred! Please let us know if this problem persists.'));
                res.end();
            }else{
                try{
                    if( !res.headersSent ){
                        res.status(500);
                        res.write(Exception_Util.get_middleware_template(exception, 'An error occurred! Please let us know if this problem persists.'));
                        res.end();
                    }
                }catch(e){
                    utils.log.error(e);
                }
                process.exit();
            }
        }
    },
    factory: function(type, message, code, scope, safe){
        if( emvc_exceptions.hasOwnProperty(type.toLowerCase()) ){
            return new emvc_exceptions[type.toLowerCase()](message, code, scope, safe);
        }
        return new (require(utils.dir.approot()+'/exceptions/'+type))(message, code, scope, safe);
    }
};

module.exports = Exception_Util;
