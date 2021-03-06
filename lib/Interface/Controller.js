var loader          = require(__dirname+'/../Loader')('Interface/Controller');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;

var ControllerInterface = function(req, res){

    var method = req.method;
    var path = req.route.path;
    var controller;
    if( path == '/' ){
        controller = 'Home';
    }else{
        var segments = path.split('/');
            segments.shift();
        var i = segments.length;
        while(i--){
            if( segments[i].match(':') ){
                segments.splice(i, 1);
                continue;
            }
            segments[i] = segments[i].charAt(0).toUpperCase() + segments[i].slice(1).toLowerCase();
        }
        controller = segments.join('/');
    }

    var ControllerRef = require(utils.dir.approot()+'/controllers/'+controller+'.js');

    if( typeof ControllerRef == 'object' ){
        if( !ControllerRef.hasOwnProperty(method) ){
            throw utils.exception.factory('default', 'Invalid method! METHOD: ' + req.method + ', URL: ' + req.originalUrl || req.url);
        }
        
        return ControllerRef[method].apply(this, arguments);
    }else{
        return ControllerRef.apply(this, arguments);
    }
};

module.exports = ControllerInterface;
