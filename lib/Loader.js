var fs = require('fs');
/**
 * Dependency loader - Synchronous
 *
 * @type {function}
 * @param {string} modules_scope - Name of loading scope
 * @return {object} - Object of all dependencies for matching scope
 * @example
 * var loader          = require(__dirname+'/Loader')('App');
 * var modules         = loader.modules,
 *     config          = loader.configs,
 *     service         = loader.services,
 *     utils           = loader.utils; 
 */
var Loader = function(modules_scope){
    var loader  = __dirname+'/Loader/'+modules_scope;
    var modules = {};
    if( fs.existsSync(loader+'.js') ){
        modules = require(loader);
    }

    return modules;
};

module.exports = Loader;
