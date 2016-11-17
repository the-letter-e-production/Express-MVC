var Dir_Util = {
    approot: function(){
        var path = process.argv[1].split('/');
        path.pop();
        path = path.join('/');
				if( process.env.hasOwnProperty("APPROOT") ){
					return process.env.APPROOT;
        }else if( !process.argv[1].match('intern-client') ){
            return path;
				}else{
            for(var i=0; i<process.argv.length; i++){
                if( process.argv[i].match('path=') ){
                    return process.argv[i].split('=')[1];
                }
            }
        }

        return path;
    }
};

module.exports = Dir_Util;
