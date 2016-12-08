/**
 * 构建工具入口文件
 * @description 构建工具入口文件，所有任务都在此调用执行
 * @author huzi
 */

/*引入npm包*/
const gulp     = require('gulp')
const through2 = require('through2');
const path     = require('path');
const gutil    = require('gulp-util');
const color    = gutil.colors;

/*引入构建模块*/
const js       = require('./lib/javscript');
const sprite   = require('./lib/sprite');
const image    = require('./lib/image');
const less     = require('./lib/less');
const html     = require('./lib/html');
const watcher  = require('./lib/watch');

var main = {
    /*初始化项目*/
    init: function(config) {
        var _self = this;

        /*全局配置缓存*/
        _self.setting(config, () => {
            /*执行dev构建*/
            _self.dev();
        });
    },

    /*配置config缓存*/
    setting: function(config, callback) {
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

        if(isConfigOk) {
            _config.dirname     = _config.dirname.replace(/\\/g,'/');
            _config.separator   = !!_config.separator ? _config.separator : '_';
            _config.srcPath     = path.join(_config.dirname, _config.path.src).replace(/\\/g,'/');
            _config.debugPath   = path.join(_config.dirname, _config.path.debug).replace(/\\/g,'/');
            _config.distPath    = path.join(_config.dirname, _config.path.dist).replace(/\\/g,'/');
            global.Cache        = {};
            global.Cache.config = _config;
            callback();
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
            color.yellow('\n    "release": "rc.xxx.com", ') + color.gray('//RC环境域名') +
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
                            watcher(() =>{});
                        });
                    });
                });
            });
        });
    },

    /*发布环境构建*/
    publish: function(config) {
        var _self = this;

        /*全局配置缓存*/
        _self.setting(config, () => {

            /*执行build构建*/
            sprite.init(() => {
                image.init(() => {
                    less.init(() => {
                        js.init(() => {
                            html.init(() => {

                            });
                        });
                    });
                });
            });
        });
    },

    /*dev环境核心库构建*/
    core: function(config) {
        var _self = this;

        /*全局配置缓存*/
        _self.setting(config, () => {
            js.core();
        });
    }
}

module.exports = main;
