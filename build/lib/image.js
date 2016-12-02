/**
 * 图片处理模块
 * @description 对图片代码进行压缩合并发布等处理
 */

/*引入npm包*/
const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');


var main = {
    init: function(config, callback) {
        var _self = this;

        /*图片处理*/
        _self.image(config);

        callback();
    },

    /*图片处理"*/
    image: function(config) {
        console.log('处理图片开始...')
        const srcDir      = config.path.src;
        const debugDir    = config.path.debug;
        const distDir     = config.path.dist;
        const _imgSrcPath = srcDir + '/img';
        var destDir = config.evn === "test" || config.evn === "www" ? distDir : debugDir;

        var _imgFile = [];
        const extname  = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'swf'];
        extname.map(item => {
            _imgFile.push(`${_imgSrcPath}/*.${item}`);
            _imgFile.push(`${_imgSrcPath}/**/*.${item}`);
        })

        gulp.src(_imgFile)
            .pipe(imagemin())
            .pipe(gulp.dest(destDir + '/img/'))
        console.log('处理图片完成！');
    }
}
module.exports = main;
