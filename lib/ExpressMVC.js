var loader          = require(__dirname+'/Loader')('ExpressMVC');
var modules         = loader.modules,
    config          = loader.configs,
    service         = loader.services,
    object          = loader.objects,
    utils           = loader.utils;

/**
 * ExpressMVC Static Wrapper
 *
 * @class
 * @type {object}
 */
var ExpressMVC      = {
    /**
     * App Method
     *
     * @return {App}
     * @example
     * var app = new ExpressMVC.App({});
     */
    App: object.app,
    /**
     * Router Method
     * 
     * @return {Router}
     * @example
     * var router = new ExpressMVC.Router('/');
     */
    Router: object.router,
    /**
     * Util Method
     * 
     * @return {object}
     * @example
     * ExpressMVC.Util.log.error('Something went wrong!');
     */
    Util: utils
};

module.exports = ExpressMVC;
