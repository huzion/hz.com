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
