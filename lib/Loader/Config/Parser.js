var modules = {
    morgan: require('morgan')
};

var configs = {
};

var services = {
};

var utils = {
    dir: require(__dirname+'/../../Dir/Util'),
    log: require(__dirname+'/../../Log/Util')
};

var interfaces = {
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services,
    utils: utils,
    interfaces: interfaces
};
