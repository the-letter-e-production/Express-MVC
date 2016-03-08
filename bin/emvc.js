#! /usr/bin/env node
var colors = {
    red: '\033[0;31',
    green: '0;32',
    nc: '0'
};

var print_color = function(text, color){
    return "\033[" + colors[color] + "m" + text + "\033[" + colors.nc + "m";
};

var spawn = require('child_process').spawn;

switch(process.argv[2])
{
    case 'bootstrap': do_bootstrap(process.argv[3]);
    break;
    default: console.log('No cmd...');
}

function do_bootstrap(app_name){
    if( typeof app_name == "undefined" ){
        return console.log('No app name defined!');
    }
    var app_path = './' + app_name;
    var cp = spawn('cp', ['-r', __dirname + '/../tmp/bootstrap', app_path]);
    console.log('Copying bootstrap files from tmp...');
    return cp.on('close', function(code){
        if( code == 0 ){
            var npm = spawn('npm', ['install'], {cwd: app_path});
            console.log('Installing dependencies...');
            npm.stdout.on('data', function(data){
                console.log(data.toString().replace(/^[^A-Za-z0-9]$/g, ''));
            });
            return npm.on('close', function(code){
                if( code == 0 ){
                    return console.log(print_color('Bootstrapped!', 'green'));
                }

                return console.log(print_color('There was an error bootstrapping your app!', 'red'));
            });
        }

        return console.log(print_color('There was an error bootstrapping your app!', 'red'));
    });
}
