/**
 * Gulp入口文件
 * @description Gulp入口文件
 * @author huzi
 */

// const fs                   = require('fs');
// const path                 = require('path');
const gulp                 = require('gulp');
// const gulpif               = require('gulp-if');
// const uglify               = require('gulp-uglify');
// const less                 = require('gulp-less');
// const sourcemaps           = require('gulp-sourcemaps');
// const cleanCss             = require('gulp-clean-css');
// const LessPluginAutoprefix = require('less-plugin-autoprefix');
// const autoprefixPlugin     = new LessPluginAutoprefix({browsers: ["last 5 versions"]});
// const spritesmith          = require('gulp.spritesmith');
// const through2             = require('through2');
// const rename               = require('gulp-rename');
// const buffer               = require('vinyl-buffer');
// const csso                 = require('gulp-csso');
const imagemin             = require('gulp-imagemin');
// const merge                = require('merge-stream');

/*引入构建工具*/
const build = require('./build/index');

const config    = require('./config.json');


gulp.task('default',() => {
    build.devBuild(config);
});


gulp.task('build',() => {
    build.publishBuild(config);
});

gulp.task('init',() => {
    build.init(config);
});









// const env       = config.env;
// const srcDir    = config.path.src;
// const debugDir  = config.path.debug;
// const distDir   = config.path.dist;
// const appJsPath = config.appJsPath;
// const jsPrefix  = config.jsPrefix;

// const _jsSrcPath = srcDir + '/js/';
// const _jsFile = [
//     `${_jsSrcPath}${appJsPath}/**/*.js?(x)`,
//     `!${_jsSrcPath}**/_*/*.js?(x)`,
//     `!${_jsSrcPath}**/_*/**/*.js?(x)`,
//     `!${_jsSrcPath}**/_*.js?(x)`
// ];

// gulp.task('js',['less'], (cb) => {
//     console.log('开始构建 JS...')
//     gulp.src(_jsFile)
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(rename(function(path) {
//             var _dirname = path.dirname.replace(/\\/g,'_');
//             if(!!_dirname && _dirname !== '.') {
//                 path.basename = jsPrefix + _dirname + '_' + path.basename;
//             } else {
//                 path.basename = jsPrefix + path.basename;
//             }
//             path.dirname = '/';
//         }))
//         .pipe(sourcemaps.write('../../maps/sourcemaps/js'))
//         .pipe(gulp.dest(distDir + '/js/'))
//         .on('end', () => console.log('JS 构建完成!'));
//     cb()
// });
//
//
//
// gulp.task('img', ['sprite'], cb => {
//     cb()
// });
//
// const _lessSrcPath = srcDir + '/less/';
// const _lessFile = [
//     `${_lessSrcPath}**/*.less`,
//     `!${_lessSrcPath}_*/**/*.less`,
//     `!${_lessSrcPath}**/_*.less`,
//     `!${_lessSrcPath}_*.less`
// ];
//
// gulp.task('less', ['img'], cb => {
//     console.log('开始构建 Less...')
//     gulp.src(_lessFile)
//         .pipe(sourcemaps.init())
//         .pipe(rename(function(path) {
//             var _dirname = path.dirname.replace(/\\/g,'_');
//             if(!!_dirname && _dirname !== '.') {
//                 path.basename = jsPrefix + _dirname + '_' + path.basename;
//             } else {
//                 path.basename = jsPrefix + path.basename;
//             }
//
//             path.dirname = '/';
//         }))
//         .pipe(less({
//             plugins: [autoprefixPlugin]
//         }))
//         .pipe(cleanCss())
//         .pipe(sourcemaps.write('../../maps/sourcemaps/css'))
//         .pipe(gulp.dest(distDir + '/css/'))
//         .on('end', () => console.log('Less 构建完成!'));
//     cb()
// });
//
// const _spSrcPath = srcDir + '/sprite/';
// const _spFile = [
//     `${_spSrcPath}**/*.png`
// ]
//
// gulp.task('sprite', (cb) => {
//     fs.readdirSync(_spSrcPath).map(function(file) {
//         var _fileName = file;
//         var _imgPath = distDir + '/img/sprite/' + file + '.png';
//
//         var _imgName = file + '.png';
//         var _lessName = file + '.less';
//
//         var outputImgPath = srcDir + '/img/sprite/';
//         var outputLessPath = srcDir + '/less/_sprite/';
//
//         gulp.src(_spFile)
//             .pipe(spritesmith({
//                 imgName: _imgName,
//                 cssName: _lessName,
//                 padding: 5,
//                 imgPath: _imgPath,
//                 algorithm: 'binary-tree',
//                 cssTemplate: function(data) {
//                     var arr=[];
//                     data.sprites.forEach(function (sprite) {
//                         arr.push(".icon-"+sprite.name+
//                         "{" +
//                         "background-image: url('"+sprite.escaped_image+"');"+
//                         "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
//                         "width:"+sprite.px.width+";"+
//                         "height:"+sprite.px.height+";"+
//                         "}\n");
//                     });
//                     return arr.join("");
//                 }
//             }))
//             .pipe(gulpif('*.png', gulp.dest(outputImgPath)))
//             .pipe(gulpif('*.less', gulp.dest(outputLessPath)))
//
//     });
//     console.log("Build sprite finished!")
//     cb();
    // return false;
    // var spriteData = gulp.src(_spFile)
    //     .pipe(through2.obj(function(file,enc,cb){
    //         _url = path.relative(_spSrcPath, file.path);
    //         _url = _url.replace(/\\/g,'/');
    //         _basename = path.dirname(_url);
    //         this.cssName = this.imgName = _basename;
    //         console.log(this.imgName, this.cssName)
    //         cb()
    //     }))
    //
    //     .pipe(spritesmith({
    //         imgName: `${this.cssName}.png`,
    //         cssName: `${this.cssName}.css`
    //     }))
    //     ;
    //
    // var imgStream = spriteData.img
    //     .pipe(buffer())
    //     .pipe(imagemin())
    //     .pipe(gulp.dest(srcDir + '/img/sp'));
    //
    // var cssStream = spriteData.css
    //     .pipe(csso())
    //     // .pipe(rename(function(path) {
    //     //     console.log(path,'=====')
    //     //     var _dirname = path.dirname.replace(/\\/g,'_');
    //     //     if(!!_dirname && _dirname !== '.') {
    //     //         path.basename = _dirname;
    //     //     } else {
    //     //         path.basename = path.basename;
    //     //     }
    //     //     path.dirname = '/';
    //     // }))
    //     .pipe(gulp.dest(distDir + '/css/'));
    //
    // return merge(imgStream, cssStream);
// });


// gulp.task('html', ['js'], cb => {
//     cb()
// });
//
//
// gulp.task('default', ['html'], () => {
//
// });
//
// gulp.task('watch', () => {
//     gulp.watch(_lessFile, ['less']);
//     gulp.watch(_jsFile, ['js']);
// })
