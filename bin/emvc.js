#! /usr/bin/env node
var spawn = require('child_process').spawn;

switch(process.argv[2])
{
    case 'bootstrap': do_bootstrap();
    break;
    default: console.log('No cmd...');
}

function do_bootstrap(){

}
