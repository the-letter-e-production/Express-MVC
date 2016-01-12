var modules = {
    express: require('express')
};

var configs = {
};

var services = {

};

var interfaces = {
    controller: require(__dirname+'/../Interface/Controller')
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services,
    interfaces: interfaces
};
