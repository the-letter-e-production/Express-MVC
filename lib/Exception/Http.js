/**
 * Http exception
 *
 * @class
 * @augments Error
 * @param {string} message - Error message
 * @param {number} [code] - HTTP Response code
 * @param {string} [scope] - Scope of message: public|private
 * @param {boolean} [safe] - Is this error safe, or do we crash the app?
 */
var Exception_Http = function(message, code, scope, safe){
    var _this    = this;
    /** @type {string} */
    this.name    = 'Http Exception';
    /** @type {string} */
    this.message = message;
    /** @type {number} */
    this.code    = code || 500;
    /** @type {string} */
    this.scope   = scope || 'public';
    /** @type {boolean} */
    this.safe    = typeof safe == "undefined" ? true : safe;
    /**
     * Is this error crash safe?
     * 
     * @return {boolean};
     */
    this.is_safe = function(){ return _this.safe; };
};

Exception_Http.prototype = new Error;

module.exports = Exception_Http;
