define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    var ExpressMVC;
    registerSuite({
        name: 'Express MVC',
        'Can Require': function () {
            ExpressMVC = require('intern/dojo/node!../../index');
        },
        'Is Object': function(){
            assert.isObject(ExpressMVC, 'ExpressMVC is an `object`');
        },
        'Check App': function(){
            assert.isDefined(ExpressMVC.App, 'ExpressMVC.App is defined');
            assert.isObject(new ExpressMVC.App, 'ExpressMVC.App is an `object`');
        },
        'Check Router': function(){
            assert.isDefined(ExpressMVC.Router, 'ExpressMVC.Router is defined');
            assert.isObject(new ExpressMVC.Router, 'ExpressMVC.Router is an `object`');
        },
        'Check Util': function(){
            assert.isDefined(ExpressMVC.Util, 'ExpressMVC.Util is defined');
            assert.isObject(ExpressMVC.Util, 'ExpressMVC.Util is an `object`');
        },
    });
});
