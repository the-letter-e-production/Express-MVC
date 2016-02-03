var modules = {
    extend: require('extend')
};

var configs = {
    options: require(__dirname+'/../Config/ExpressMVC/Options')
};

var services = {

};

var objects = {
    router: require(__dirname+'/../Router'),
    app: require(__dirname+'/../App')
};

var utils = {
    dir: require(__dirname+'/../Dir/Util'),
    exception: require(__dirname+'/../Exception/Util') 
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services,
    objects: objects,
    utils: utils
};
