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
const through              = require('through2');
const gutil                = require('gulp-util');
const color                = gutil.colors;
const rev                  = require('gulp-rev');
const revCollector         = require('gulp-rev-collector');

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
        var _self          = this;

        const prefix       = config.prefix;
        const srcDir       = config.srcPath;
        const debugDir     = config.debugPath;
        const distDir      = config.distPath;
        const _lessSrcPath = srcDir + '/less';
        const destDir      = config.evn === "test" || config.evn === "www" ? distDir : debugDir;

        const _lessFile    = [
            `${_lessSrcPath}/**/*.less`,
            `!${_lessSrcPath}/_*/**/*.less`,
            `!${_lessSrcPath}/**/_*.less`,
            `!${_lessSrcPath}/_*.less`
        ];

        gulp.src(_lessFile)
            .pipe(sourcemaps.init())
            .pipe(rename(function(path) {
                var _dirname = path.dirname.replace(/\\/g,config.separator);
                if(!!_dirname && _dirname !== '.') {
                    path.basename = prefix + config.separator + _dirname + config.separator + path.basename;
                } else {
                    path.basename = prefix + config.separator + path.basename;
                }
                path.dirname = '/';
            }))
            .pipe(less({
                plugins: [autoprefixPlugin]
            }))
            .pipe(cleanCss())
            .pipe(rev())
            .pipe(sourcemaps.write(config.dirname + '/maps/sourcemaps/css'))
            .pipe(gulp.dest(destDir + '/css/'))
            .pipe(rev.manifest('cssMap.json',{"merge":true}))
            .pipe(gulp.dest(config.dirname + '/maps/'))
            .pipe(through.obj(function(file,enc,cb){
                console.log(color.green(file.path) + '..........' + color.cyan('[done]'));
            }))
        console.log('处理Less完成！');
    }
}
module.exports = main;
