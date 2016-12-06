/**
 * 图片处理模块
 * @description 对图片代码进行压缩合并发布等处理
 */

/*引入npm包*/
const gulp        = require('gulp');
const gutil       = require('gulp-util');
const color       = gutil.colors;
const fileinclude = require('gulp-file-include');
const through     = require('through2');
const ejs         = require('gulp-ejs');

var main = {
    init: function(callback) {
        var _self  = this;
        var config = global.Cache.config;

        /*html处理*/
        _self.buildHtml(config);

        callback();
    },
    buildHtml: function(config) {
        gutil.log('处理HTML开始...');
        const srcDir       = config.srcPath;
        const debugDir     = config.debugPath;
        const distDir      = config.distPath;
        const _htmlSrcPath = srcDir + '/html';
        var destDir        = config.env === "test" || config.env === "www" ? distDir : debugDir;
        var _htmlFile      = [
            `${_htmlSrcPath}/**/*.html`,
            `!${_htmlSrcPath}/**/_*.html`,
            `!${_htmlSrcPath}/_*.html`,
            `!${_htmlSrcPath}/**/_*/**/*.html`
        ];

        gulp.src(_htmlFile)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(ejs({
                int_css: 'csspathstring',
                int_js: 'jspathstring'
            }).on('error', gutil.log))
            .pipe(gulp.dest(destDir + '/html'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.green(file.path) + '.........' + color.cyan('[done]'));
            }))

        gutil.log('处理HTML完成');
    }
}
module.exports = main;
