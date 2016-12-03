/**
 * 图片处理模块
 * @description 对图片代码进行压缩合并发布等处理
 */

/*引入npm包*/
const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const gutil    = require('gulp-util');

var main = {
    init: function(config, callback) {
        var _self = this;

        /*图片处理*/
        _self.image(config);

        callback();
    },

    /*图片处理"*/
    image: function(config) {
        gutil.log('处理图片开始...')
        const srcDir      = config.path.src;
        const debugDir    = config.path.debug;
        const distDir     = config.path.dist;
        const _imgSrcPath = srcDir + '/img';
        var destDir = config.evn === "test" || config.evn === "www" ? distDir : debugDir;

        var _imgFile = [
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
