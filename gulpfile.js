/**
 * Gulp入口文件
 * @description Gulp入口文件
 * @author huzi
 */

/*引入npm包*/
const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');

/*引入构建工具*/
const build    = require('./build/index');
/*引入配置文件*/
var config     = require('./config.json');
config.dirname = config.dirname || __dirname;

gulp.task('default',() => {
    build.init(config);
});

gulp.task('build',() => {
    build.publishBuild(config);
});

gulp.task('init',() => {
    build.init(config);
});

gulp.task('core', () => {
    build.core(config);
});
