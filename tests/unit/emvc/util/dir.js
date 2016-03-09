define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    var q = require('intern/dojo/node!q');

    var ExpressMVC = require('intern/dojo/node!../../../../index');
    registerSuite({
        name: 'Express MVC - Util - Dir',
        'Is Object': function(){
            assert.isObject(ExpressMVC.Util.dir);
        },
        'Check App Root': function(){
            assert.strictEqual(ExpressMVC.Util.dir.approot().split('/').pop(), 'Express-MVC');
        },
    });
});
