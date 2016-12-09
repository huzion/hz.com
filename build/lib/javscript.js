/**
 * javascript处理模块
 * @description 对javascript代码进行压缩合并发布等处理
 */

/*引入模块*/
const gulp         = require('gulp');
const uglify       = require('gulp-uglify');
const sourcemaps   = require('gulp-sourcemaps');
const path         = require('path');
const rename       = require('gulp-rename');
const through      = require('through2');
const gutil        = require('gulp-util');
const color        = gutil.colors;
const concat       = require('gulp-concat');
const rev          = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

var main = {
    init: function(callback) {
        var _self  = this;
        var config = global.Cache.config;

        if(['test', 'rc', 'www'].indexOf(config._env) > -1) {
            _self.publishJs(config);
        }else {
            _self.buildJs(config);
        }

        callback();
    },

    /*判断*/

    /*获取js文件*/
    getJsFile: function(config) {
        const _jsSrcPath = config.srcPath + '/js';
        const _appJsPath = config.appjsPath || 'app';
        const _jsFile    = [
            `${_jsSrcPath}/${_appJsPath}/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*.js?(x)`
        ];
        return _jsFile;
    },

    /*构建JS 用于开发环境*/
    buildJs: function(config) {
        console.log('开始构建JS...');
        var _self   = this;
        var prefix  = config.prefix;
        var _jsFile = _self.getJsFile(config);

        gulp.src(_jsFile)
            .pipe(rename(function(path) {
                var _dirname = path.dirname.replace(/\\/g,config.separator);
                if(!!_dirname && _dirname !== '.') {
                    path.basename = prefix + config.separator + _dirname + config.separator + path.basename;
                } else {
                    path.basename = prefix + config.separator + path.basename;
                }
                path.dirname = '/';
            }))
            .pipe(rev())
            .pipe(gulp.dest(config.debugPath + '/js/'))
            .pipe(rev.manifest('jsmap.json',{"merge":true}))
            .pipe(gulp.dest(config.dirname + '/maps/'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.cyan(file.path) + '.........' + color.green.bold('[done]'));
            }))
    },

    /*发布JS 用于生产环境*/
    publishJs: function(config) {
        console.log('开始构建JS...');
        var _self   = this;
        var prefix  = config.prefix;
        var _jsFile = _self.getJsFile(config);
        gulp.src(_jsFile)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename(function(path) {
                var _dirname = path.dirname.replace(/\\/g,config.separator);
                if(!!_dirname && _dirname !== '.') {
                    path.basename = prefix + config.separator + _dirname + config.separator + path.basename;
                } else {
                    path.basename = prefix + config.separator + path.basename;
                }
                path.dirname = '/';
            }))
            .pipe(rev())
            .pipe(sourcemaps.write(config.dirname + '/maps/sourcemaps/js'))
            .pipe(gulp.dest(config.distPath + '/js/'))
            .pipe(rev.manifest('jsmap.json',{"merge":true}))
            .pipe(gulp.dest(config.dirname + '/maps/'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.cyan(file.path) + '.........' + color.green.bold('[done]'));
            }))
    },

    /*构建核心库 用于开发环境*/
    buildCoreJs: function(config) {
        console.log('开始构建JS核心库...');
        const prefix     = config.prefix;
        const _jsSrcPath = config.srcPath + '/js';
        const _coreJsPath = '/vender';
        const _jsFile    = [
            `${_jsSrcPath}/${_coreJsPath}/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*.js?(x)`
        ];

        var _fileName = prefix + config.separator + 'core.js';

        gulp.src(_jsFile)
            .pipe(concat({path: _fileName, newLine: ';'}))
            .pipe(gulp.dest(config.debugPath + '/js/'))

        console.log('JS核心库构建完成');
    },

    /*构建核心库 用于生产环境*/
    publishCoreJs: function(config) {
        console.log('开始构建JS核心库...');
        const prefix     = config.prefix;
        const _jsSrcPath = config.srcPath + '/js';
        const _coreJsPath = '/vender';
        const _jsFile    = [
            `${_jsSrcPath}/${_coreJsPath}/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*.js?(x)`
        ];

        var _fileName = prefix + config.separator + 'core.js';

        gulp.src(_jsFile)
            .pipe(sourcemaps.init())
            .pipe(concat({path: _fileName, newLine: ';'}))
            .pipe(uglify())
            .pipe(sourcemaps.write('../../maps/sourcemaps/js'))
            .pipe(gulp.dest(config.distPath + '/js/'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.cyan(file.path) + '.........' + color.green.bold('[done]'));
            }))

        console.log('JS核心库构建完成');
    }
}
module.exports = main;
