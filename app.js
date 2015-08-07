/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/colors/colors.d.ts"/>
"use strict";
var fs = require('fs');
var colors = require('colors/safe');
var readline = require('readline');
fs.readdir(process.cwd(), function (err, files) {
    var stats = [];
    files.forEach(function (item, index, array) {
        var stat = fs.statSync(item);
        stats[index] = stat;
        if (stat.isDirectory()) {
            console.log(colors.gray(index + ': ') + colors.blue(item + '/'));
        }
        else if (stat.isFile()) {
            console.log(colors.gray(index + ': ') + colors.green(item));
        }
    });
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("\n请输入要查看的文件: ", function (answer) {
        handle(answer);
        rl.close();
    });
    function handle(choice) {
        if (stats[choice].isDirectory()) {
            var _files = fs.readdirSync(files[choice]);
            _files.forEach(function (item, index, array) {
                var _stat = fs.statSync(process.cwd() + '/' + files[choice] + '/' + item);
                if (_stat.isDirectory()) {
                    console.log(colors.gray(index + ': ') + colors.blue(item + '/'));
                }
                else if (_stat.isFile()) {
                    console.log(colors.gray(index + ': ') + colors.green(item));
                }
            });
        }
        else {
            var _file = fs.readFileSync(files[choice], 'utf-8');
            console.log(_file);
        }
    }
});
//# sourceMappingURL=app.js.map