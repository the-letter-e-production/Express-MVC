var modules = {
    winston: require('winston'),
    googleapis: require('googleapis'),
    moment: require('moment')
};

try{
var labels = JSON.parse(process.env.GOOGLE_LOGGING_LABELS);
}catch(e){
var labels = {};
}

var configs = {
    google: {
        logging: {
            project_id: process.env.GOOGLE_LOGGING_PROJECT,
            service_name: process.env.GOOGLE_LOGGING_SERVICE,
            region: process.env.GOOGLE_LOGGING_REGION,
            zone: process.env.GOOGLE_LOGGING_ZONE,
            labels: labels,
            service_account: {
                email: process.env.GOOGLE_LOGGING_SERVICE_ACCOUNT_EMAIL,
                key: process.env.GOOGLE_LOGGING_SERVICE_ACCOUNT_KEY
            }
        }
    }
};

var services = {

};

var objects = {
};

var utils = {
    util: require('util'),
    exception: require('../../../Exception/Util')
};

module.exports = {
    modules: modules,
    configs: configs,
    services: services,
    objects: objects,
    utils: utils
};
