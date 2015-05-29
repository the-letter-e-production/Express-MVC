var fs = require('fs');
var Loader = function(modules_scope){
    var loader  = './Loader/'+modules_scope;
    var modules = {};
    if( fs.existsSync(loader+'.js') ){
        modules = require('./Loader/'+modules_scope);
    }

    return modules;
};

module.exports = Loader;
