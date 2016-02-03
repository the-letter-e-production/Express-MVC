var modules = {
    extend: require('extend'),
    express: require('express'),
    config_parser: require('../Config/Parser'),
    http: require('http'),
    finalhandler: require('finalhandler')
};

var configs = {
    options: require(__dirname+'/../Config/App/Options')
};

var services = {
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services
};
