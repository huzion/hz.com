/**
 * 雪碧图处理模块
 * @description 将雪碧图按目录名合并，并以目录名命名图片及样式文件
 */

/*引入模块*/
const fs          = require('fs');
const gulp        = require('gulp');
const gulpif      = require('gulp-if');
const spritesmith = require('gulp.spritesmith');
const rename      = require('gulp-rename');
const imagemin    = require('gulp-imagemin');
const through     = require('through2');
const gutil       = require('gulp-util');
const color       = gutil.colors;

var main = {
    init: function(callback) {
        var _self = this;

        var config = global.Cache.config;
        /*雪碧图处理*/
        _self.sprite(config);

        callback();
    },

    /*雪碧图处理*/
    sprite: function(config) {
        console.log('开始构建雪碧图...')
        var _self = this;

        var srcDir = config.srcPath,
            debugDir = config.debugPath,
            distDir = config.distPath;

        var _spSrcPath = srcDir + '/sprite';
        var destDir = config.env === "test" || config.env === "www" ? distDir : debugDir;

        var _spFile = [
            `${_spSrcPath}/**/*.png`
        ];

        fs.readdirSync(_spSrcPath).map(function(file) {
            var _fileName = file;
            var _imgPath = destDir + '/img/sprite/' + file + '.png';
            var _imgName = file + '.png';
            var _lessName = file + '.less';

            var outputImgPath = srcDir + '/img/sprite/';
            var outputLessPath = srcDir + '/less/_sprite/';

            gulp.src(_spFile)
                .pipe(spritesmith({
                    /*图片名称*/
                    imgName: _imgName,

                    /*less文件名称*/
                    cssName: _lessName,

                    /*单元雪碧图边框*/
                    padding: 5,

                    /*生成的雪碧图路径(作废，在下面gulp.dest处生成)*/
                    // imgPath: _imgPath,

                    /*合并布局方式*/
                    algorithm: 'binary-tree',

                    /*css模板*/
                    cssTemplate: function(data) {
                        var arr=[];
                        data.sprites.forEach(function (sprite) {
                            arr.push(".icon-"+sprite.name+
                            "{" +
                            "background-image: url('"+sprite.escaped_image+"');"+
                            "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                            "width:"+sprite.px.width+";"+
                            "height:"+sprite.px.height+";"+
                            "}\n");
                        });
                        return arr.join("");
                    }
                }))
                .pipe(gulpif('*.png', gulp.dest(outputImgPath)))
                .pipe(gulpif('*.less', gulp.dest(outputLessPath)))
                .pipe(through.obj(function(file,enc,cb){
                    console.log(color.cyan(file.path) + '..........' + color.green.bold('[done]'));
                }))
        });
    },
}
module.exports = main;
