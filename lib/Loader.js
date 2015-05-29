var fs = require('fs');
var Loader = function(modules_scope){
    var loader  = __dirname+'/Loader/'+modules_scope;
    var modules = {};
    if( fs.existsSync(loader+'.js') ){
        modules = require(loader);
    }

    return modules;
};

module.exports = Loader;
