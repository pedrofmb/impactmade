const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

var tscompile = function(folder) 
{
    console.log("Compiling "+folder+"...");

    exec('tsc -d -p '+ folder);
}

var tsc = function()
{
    tscompile("./typings/callTabs");
    tscompile("./typings/pluginCategories")
    tscompile("./typings/treeViewCore");
}

var build = function()
{
    tsc();
}

build();
console.log("END.");
