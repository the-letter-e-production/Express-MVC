var modules = {
};

var configs = {
};

var services = {

};

var objects = {
    router: require(__dirname+'/../Router'),
    app: require(__dirname+'/../App')
};

var utils = {
    dir: require(__dirname+'/../Dir/Util'),
    exception: require(__dirname+'/../Exception/Util'),
    log: require(__dirname+'/../Log/Util'),
    express: require('express') 
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services,
    objects: objects,
    utils: utils
};
