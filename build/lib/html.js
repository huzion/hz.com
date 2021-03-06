/**
 * 图片处理模块
 * @description 对图片代码进行压缩合并发布等处理
 */

/*引入模块*/
const gulp        = require('gulp');
const gutil       = require('gulp-util');
const color       = gutil.colors;
const fileinclude = require('gulp-file-include');
const through     = require('through2');
const ejs         = require('gulp-ejs');

/*引入tools*/
const tools = require('./tools');

var main = {
    init: function(callback) {
        var _callback = callback || function(){};
        var _self  = this;
        var config = global.Cache.config;

        /*html处理*/
        _self.buildHtml(config);

        _callback();
    },

    /*构建html*/
    buildHtml: function(config) {
        gutil.log('处理HTML开始...');
        const srcDir       = config.srcPath;
        const debugDir     = config.debugPath;
        const distDir      = config.distPath;
        const _htmlSrcPath = srcDir + '/html';
        var destDir = ['test', 'rc', 'www'].indexOf(config._env) > -1 ? distDir : debugDir;
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
                init_css: tools.init_css,
                init_js: tools.init_js
            }).on('error', gutil.log))
            .pipe(gulp.dest(destDir + '/html'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.cyan(file.path) + '.........' + color.green.bold('[done]'));
            }))
    }
}
module.exports = main;
