/**
 * 执行watch模块
 * @description 执行watch模块
 */

/*引入npm包*/
const gulp  = require('gulp');
const watch = require('gulp-watch');
const gutil = require('gulp-util');

var utils = {
    /*要监视的文件*/
    file: function(config) {
        var srcDir = config.path.src;
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

    /*判断文件类型*/
    getType: () => {

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
var watcher = function(config) {
    var _self = this;
    var _file = utils.file(config);
    var _list = [];

    watch(_file, (file) => {
        try {
            var _event = file.event;
            var _filePath;

            if(!!_event) {
                _filePath = file.path.replace(/\\/g,"/");
            }

        } catch(err) {
            console.log(err)
        }
    });
};

module.exports = watch;
