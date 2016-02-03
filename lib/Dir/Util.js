var Dir_Util = {
    approot: function(){
        var path = process.argv[1].split('/');
        path.pop();
        return path.join('/');
    }
};

module.exports = Dir_Util;
