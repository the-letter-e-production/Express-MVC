var modules = {
    express: require('express')
};

var configs = {
};

var services = {

};

var utils = {
    dir: require(__dirname+'/../Dir/Util')
};

var interfaces = {
    controller: require(__dirname+'/../Interface/Controller')
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services,
    utils: utils,
    interfaces: interfaces
};
