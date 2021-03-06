/**
 * 图片处理模块
 * @description 对图片代码进行压缩合并发布等处理
 */

/*引入模块*/
const gulp         = require('gulp');
const imagemin     = require('gulp-imagemin');
const gutil        = require('gulp-util');
const color        = gutil.colors;
const rename       = require('gulp-rename');
const through      = require('through2');
const rev          = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

var main = {
    init: function(callback) {
        var _self = this;
        var config = global.Cache.config;
        /*图片处理*/
        _self.image(config);

        callback();
    },

    /*图片处理"*/
    image: function(config) {
        gutil.log('处理图片开始...')
        const srcDir      = config.srcPath;
        const debugDir    = config.debugPath;
        const distDir     = config.distPath;
        const _imgSrcPath = srcDir + '/img';
        var destDir = ['test', 'rc', 'www'].indexOf(config._env) > -1 ? distDir : debugDir;
        var _imgFile      = [
            `${_imgSrcPath}/*.{gif,jpg,jpeg,png,svg}`,
            `${_imgSrcPath}/**/*.{gif,jpg,jpeg,png,svg}`
        ];

        gulp.src(_imgFile)
            .pipe(imagemin())
            .pipe(rev())
            .pipe(gulp.dest(destDir + '/img/'))
            .pipe(rev.manifest('imgmap.json',{"merge":true}))
            .pipe(gulp.dest(config.dirname + '/maps/'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.cyan(file.path) + '..........' + color.green.bold('[done]'));
            }))
    }
}
module.exports = main;
