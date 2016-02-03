var Exception_Default = function(message, code, scope, safe){
    var _this    = this;
    this.name    = 'Default Exception';
    this.message = message;
    this.code    = code || 500;
    this.scope   = scope || 'public';
    this.safe    = typeof safe == "undefined" ? true : safe;
    this.is_safe = function(){ return _this.safe; };
};

Exception_Default.prototype = new Error;

module.exports = Exception_Default;
