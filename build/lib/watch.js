/**
 * 执行watch模块
 * @description 执行watch模块
 */

/*引入npm包*/
const gulp  = require('gulp');
const watch = require('gulp-watch');
const gutil = require('gulp-util');
const color = gutil.colors;
const path  = require('path');

/*引入构建模块*/
const js       = require('./javscript');
const sprite   = require('./sprite');
const image    = require('./image');
const less     = require('./less');

var utils = {
    /*要监视的文件*/
    file: function(config) {
        var srcDir = config.srcPath;
        var arr = [
            `${srcDir}/img/**/*.{gif,jpg,jpeg,png,svg}`,
            `${srcDir}/js/**/*.js`,
            `${srcDir}/less/**/*.less`,
            `${srcDir}/sprite/**/*.png`,
            `${srcDir}/html/**/*.html`,
            "!.DS_Store"
        ];
        return arr;
    },

    /*判断文件类型（获取处理的文件的src目录）*/
    getType: (filePath, srcDir) => {
        var _path = path.relative(srcDir, filePath);
        _path = _path.replace(/\\/g, '/').replace(/\/\//g,'/');
        return _path.split('/')[0];
    },

    /*雪碧图构建*/
    sprite: () => {

    },

    /*js构建*/
    js: () => {

    },

    /*less构建*/
    less: () => {

    },

    /*图片构建*/
    image: () => {

    }
};

/*watch执地*/
var watcher = function() {
    var config = global.Cache.config;

    var _self = this;
    var _file = utils.file(config);
    var _list = [];
    var srcDir = config.srcPath;
    var _dirname = config.dirname;

    watch(_file, (file) => {
        try {
            console.log('执行watch方法')

            var _event = file.event;
            var _filePath;

            if(!!_event) {
                _filePath = file.path.replace(/\\/g,"/");

                if(_list.indexOf(_filePath) === -1) {
                    _list.push(_filePath);
                    var _type = utils.getType(_filePath, srcDir);
                    switch (_type) {
                        case "html":
                            // html.init((_filePath) => gutil.log(file.relative));
                            break;
                        case "img":
                            image.init((_filePath) => gutil.log(file.relative + '.........[done]'));
                            break;
                        case "js":
                            js.init((_filePath) => gutil.log(file.relative + '.........[done]'));
                            break;
                        case "less":
                            less.init((_filePath) => gutil.log(file.relative + '.........[done]'));
                            break;

                        case "sprite":
                            sprite.init((_filePath) => gutil.log(file.relative + '.........[done]'));
                            break;
                    }
                }

                /*防止重复构建，设置3秒间隔*/
                var watch_timer = setTimeout(() => {
                    _list = [];
                }, 3000);

            }


        } catch(err) {
            console.log(err)
        }
    });
};

module.exports = watcher;
