/**
 * javascript处理模块
 * @description 对javascript代码进行压缩合并发布等处理
 */

/*引入npm包*/
const gulp       = require('gulp');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const path       = require('path');
const rename     = require('gulp-rename');

var main = {
    init: function(callback) {
        var _self  = this;
        var config = global.Cache.config;
        if(config.env === 'test' || config.env === 'www') {
            _self.publishJs(config);
        } else {
            _self.buildJs(config);
        }

        callback();
    },

    /*构建JS 用于开发环境*/
    buildJs: function(config) {
        console.log('开始构建JS...');

        const prefix     = config.prefix;
        const _jsSrcPath = config.srcPath + '/js';
        const _appJsPath = '/app';
        const _jsFile    = [
            `${_jsSrcPath}/${_appJsPath}/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/*.js?(x)`,
            `!${_jsSrcPath}/**/_*/**/*.js?(x)`,
            `!${_jsSrcPath}/**/_*.js?(x)`
        ];

        gulp.src(_jsFile)
            .pipe(rename(function(path) {
                var _dirname = path.dirname.replace(/\\/g,'_');
                if(!!_dirname && _dirname !== '.') {
                    path.basename = prefix + _dirname + '_' + path.basename;
                } else {
                    path.basename = prefix + path.basename;
                }
                path.dirname = '/';
            }))
            .pipe(gulp.dest(config.debugPath + '/js/'))
        console.log('JS构建完成！');
    },

    /*发布JS 用于生产环境*/
    publishJs: function(config) {
        console.log('开始构建JS...');
        gulp.src(_jsFile)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename(function(path) {
                var _dirname = path.dirname.replace(/\\/g,'_');
                if(!!_dirname && _dirname !== '.') {
                    path.basename = prefix + _dirname + '_' + path.basename;
                } else {
                    path.basename = prefix + path.basename;
                }
                path.dirname = '/';
            }))
            .pipe(sourcemaps.write('../../maps/sourcemaps/js'))
            .pipe(gulp.dest(distDir + '/js/'))
        console.log('JS构建完成！');
    },

    /*构建核心库 用于开发环境*/
    buildCoreJs: function(config) {

    },

    /*发布核心库 用于生产环境*/
    publishCoreJs: function(config) {

    }
}
module.exports = main;
