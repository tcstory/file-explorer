/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/colors/colors.d.ts"/>

"use strict";

var fs = require('fs');
var colors = require('colors/safe');
var readlineSync = require('readline-sync');


while(true) {
    var files = fs.readdirSync(process.cwd());
    showFiles(files);

    console.log(colors.magenta('\nb: ' + colors.magenta('Back')));
    console.log(colors.red("e: ") + colors.red('Exit'));
    var choice = readlineSync.question("\n请输入要查看的文件: ");
    if (choice === 'b') {
        process.chdir('../');
        continue
    } else if (choice === 'e') {
        process.exit(0);
    }
    choice = parseInt(choice);
    if (isNaN(choice)) {
        process.exit(1);
    } else if (choice >= 0 && choice < files.length){
        handleFiles(files[choice]);
    } else {
        console.log(colors.red('不存在的文件'));
    }
}

/**
 * 把文件展示给用户
 * @param files
 * @return void
 */
function showFiles(files:Array<string>):void {
    files.forEach(function (item, index, array) {
        var stat = fs.statSync(item);
        if (stat.isDirectory()) {
            console.log(colors.gray(index + ': ') + colors.blue(item + '/'));
        } else if (stat.isFile()) {
            console.log(colors.gray(index + ': ') + colors.green(item));
        }
    });
}

function handleFiles(file:string):void {
    var stat = fs.statSync(file);
    if (stat.isDirectory()) {
        process.chdir(file);
    } else if (stat.isFile()) {
        var file_content = fs.readFileSync(files[choice], 'utf-8');
        console.log(colors.yellow(file_content));
    }
}
