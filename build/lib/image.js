/**
 * 图片处理模块
 * @description 对图片代码进行压缩合并发布等处理
 */

/*引入npm包*/
const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const gutil    = require('gulp-util');
const rename   = require('gulp-rename');

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
        var destDir       = config.evn === "test" || config.evn === "www" ? distDir : debugDir;

        var _imgFile      = [
            `${_imgSrcPath}/*.{gif,jpg,jpeg,png,svg}`,
            `${_imgSrcPath}/**/*.{gif,jpg,jpeg,png,svg}`
        ];

        gulp.src(_imgFile)
            .pipe(imagemin())
            .pipe(gulp.dest(destDir + '/img/'))
        gutil.log('处理图片完成！');
    }
}
module.exports = main;
