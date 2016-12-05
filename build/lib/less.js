/**
 * javascript处理模块
 * @description 对javascript代码进行压缩合并发布等处理
 */

/*引入npm包*/
const gulp                 = require('gulp');
const less                 = require('gulp-less');
const cleanCss             = require('gulp-clean-css');
const LessPluginAutoprefix = require('less-plugin-autoprefix');
const autoprefixPlugin     = new LessPluginAutoprefix({browsers: ["last 5 versions"]});
const sourcemaps           = require('gulp-sourcemaps');
const path                 = require('path');
const rename               = require('gulp-rename');

var main = {
    init: function(callback) {
        var _self = this;
        var config = global.Cache.config;
        /*处理less*/
        _self.buildLess(config);

        callback();
    },

    /*处理less*/
    buildLess: function(config) {
        console.log('开始处理Less...');
        var _self = this;

        const prefix     = config.prefix;
        const srcDir       = config.srcPath;
        const debugDir     = config.debugPath;
        const distDir      = config.distPath;
        const _lessSrcPath = srcDir + '/less';
        var destDir        = config.evn === "test" || config.evn === "www" ? distDir : debugDir;

        const _lessFile    = [
            `${_lessSrcPath}/**/*.less`,
            `!${_lessSrcPath}/_*/**/*.less`,
            `!${_lessSrcPath}/**/_*.less`,
            `!${_lessSrcPath}/_*.less`
        ];

        gulp.src(_lessFile)
            .pipe(sourcemaps.init())
            .pipe(rename(function(path) {
                var _dirname = path.dirname.replace(/\\/g,'_');
                if(!!_dirname && _dirname !== '.') {
                    path.basename = prefix + _dirname + '_' + path.basename;
                } else {
                    path.basename = prefix + path.basename;
                }

                path.dirname = '/';
            }))
            .pipe(less({
                plugins: [autoprefixPlugin]
            }))
            .pipe(cleanCss())
            .pipe(sourcemaps.write('../../maps/sourcemaps/css'))
            .pipe(gulp.dest(destDir + '/css/'))
        console.log('处理Less完成！');
    }
}
module.exports = main;
