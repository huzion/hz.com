/**
 * 构建工具入口文件
 * @description 构建工具入口文件，所有任务都在此调用执行
 * @author huzi
 */

/*引入模块*/
const fs       = require('fs');
const gulp     = require('gulp')
const through2 = require('through2');
const path     = require('path');
const gutil    = require('gulp-util');
const color    = gutil.colors;
const minimist = require('minimist');

/*引入本地构建模块*/
const js       = require('./lib/javscript');
const sprite   = require('./lib/sprite');
const image    = require('./lib/image');
const less     = require('./lib/less');
const html     = require('./lib/html');
const watcher  = require('./lib/watch');

var main = {
    /*初始化*/
    init: function(config) {
        var _self = this;

        /*全局配置缓存*/
        var _config = _self.setting(config);
        var _dirname = _config.dirname;
        var _dirs = [
            'src/less/common',
            'dist',
            'debug'
        ];

        console.log(_dirs)

        _dirs.map(item => {
            _self.mkdirs(item, (err) => {
                console.log(color.red(err));
            });
        });

        console.log(color.green('初始化完成！'));
    },

    /*创建目录方法*/
    mkdirs: function(path, callback){
        var dirs = path.slice(0).split("/");
        var path = '';
        dirs.map((item, index) => {
            if(index > 0) {
                path = path + '/' + item;
            } else {
                path = item;
            }
            console.log(path)
        })

        // var mk = function(err){
        //     i += 1;
        //     if(i > dirs.length){
        //         callback(err);
        //         return;
        //     }
        //     fs.mkdir('/' + dirs.slice(0, i).join('/'), function(err){
        //         mk(err);
        //     });
        // };
        //
        // mk();
    },

    /*执行gulp默认命令*/
    default: function(config) {
        var _self   = this;

        /*全局配置缓存*/
        var _config = _self.setting(config);
        var _env    = _config._env;

        if(['dev','test', 'rc', 'www'].indexOf(_env) > -1) {
            /*执行发布构建*/
            _self.publish();
        } else {
            /*执行dev构建*/
            _self.dev();
        }
    },

    /*获取命令行参数*/
    getArgv: function() {
        var _argv = process.argv.slice(2);
        var _knownOptions = {string: "e"};
        var options = minimist(_argv, _knownOptions);
        return options;
    },

    /*获取命令行环境参数*/
    getEnv: function() {
        var _self = this;
        var _argv = _self.getArgv();
        var _env = _argv.e || 'local';
        return _env;
    },

    /*配置config缓存*/
    setting: function(config) {
        console.log(color.bgGreen.blue('[  载入配置信息......  ]'));
        var _self = this;
        var _config = config || {};
        var isConfigOk = true;

        var arr = ['path', 'domain', 'env'];
        arr.map(item => {
            if(isConfigOk) {
                if(!(item in _config)) {
                    isConfigOk = false;
                }
            } else {
                return false;
            }
        });

        /*获取命令行环境参数*/
        var _env = _self.getEnv();

        if(isConfigOk) {
            _config.dirname     = _config.dirname.replace(/\\/g,'/');
            _config.separator   = !!_config.separator ? _config.separator : '_';
            _config.srcPath     = path.join(_config.dirname, _config.path.src).replace(/\\/g,'/');
            _config.debugPath   = path.join(_config.dirname, _config.path.debug).replace(/\\/g,'/');
            _config.distPath    = path.join(_config.dirname, _config.path.dist).replace(/\\/g,'/');
            _config._env        = _env;
            global.Cache        = {};
            global.Cache.config = _config;
            return global.Cache.config;
        } else {
            _self.noticeConfig();
            return false;
        }
    },

    /*提示配置文件信息*/
    noticeConfig: function() {
        console.log(
            color.bgRed('"/config.json" 配置文件不完整或未引用') +
            color.bgRed('\n"/config.json" 配置文件示例，请依需要自行调整') +
            color.yellow('\n================================================') +
            color.yellow('\n{') +
            color.yellow('\n  "env":"local", ') + color.gray('// local || test || www 环境变量') +
            color.yellow('\n  "apiEnv": "test", ') + color.gray('// local || test || www 接口环境变量') +
            color.yellow('\n  "port": "7788", ') + color.gray('// 端口号') +
            color.yellow('\n  "prefix": "hz", ') + color.gray('// js及css文件名前缀') +
            color.yellow('\n  "separator": "_", ') + color.gray('// js及css文件名间隔符') +
            color.yellow('\n  "path": {') +
            color.yellow('\n    "src": "./src", ') + color.gray('//开发源码目录') +
            color.yellow('\n    "debug": "./debug", ') + color.gray('//构建生成的测试目录') +
            color.yellow('\n    "dist": "./dist" ') + color.gray('//构建生成的发布目录') +
            color.yellow('\n    "map": "./maps" ') + color.gray('//生成的map文件目录') +
            color.yellow('\n  },') +
            color.yellow('\n   "domain": {') +
            color.yellow('\n    "local": "local.xxx.com", ') + color.gray('//本地环境域名') +
            color.yellow('\n    "dev": "dev.xxx.com", ') + color.gray('//调试环境域名') +
            color.yellow('\n    "test": "test.xxx.com", ') + color.gray('//测试环境域名') +
            color.yellow('\n    "rc": "rc.xxx.com", ') + color.gray('//RC环境域名') +
            color.yellow('\n    "www": "www.xxx.com", ') + color.gray('//生产环境域名') +
            color.yellow('\n  },') +
            color.yellow('\n  "appJsPath": "app", ') + color.gray('//js业务逻辑代码文件目录') +
            color.yellow('\n  "htmlViews": "./views", ') + color.gray('//视图文件生成目录') +
            color.yellow('\n  "mapPath": "./maps", ') + color.gray('//map文件生成目录') +
            color.yellow('\n  "coreJs": {') +
            color.yellow('\n    "mods": [ ') + color.gray('//核心js代码库') +
            color.yellow('\n      "jquery",') +
            color.yellow('\n      "ejs"') +
            color.yellow('\n    ],') +
            color.yellow('\n    "name": "corelibs",  ') + color.gray('//生成的核心库文件命名') +
            color.yellow('\n    "src": "./src/js/vender"  ') + color.gray('//核心js代码库文件所在目录') +
            color.yellow('\n  }') +
            color.yellow('\n}') +
            color.yellow('================================================')
        )
        return false;
    },


    /*开发环境构建*/
    dev: function() {
        sprite.init(() => {
            image.init(() => {
                less.init(() => {
                    js.init(() =>{
                        html.init(() => {
                            watcher(() =>{
                                gutil.log(color.green('构建完成！进入watch模式……'));
                            });
                        });
                    });
                });
            });
        });
    },

    /*发布环境构建*/
    publish: function(config) {
        sprite.init(() => {
            image.init(() => {
                less.init(() => {
                    js.init(() => {
                        html.init();
                    });
                });
            });
        });
    },

    /*dev环境核心库构建*/
    core: function(config) {
        var _self = this;

        //*全局配置缓存*/
        var _config = _self.setting(config);
        var _env    = _config._env;
        if(_env === 'www') {
            js.publishCoreJs(_config);
        } else {
            js.buildCoreJs(_config);
        }
    }
}

module.exports = main;
