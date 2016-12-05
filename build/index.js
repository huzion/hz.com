/**
 * 构建工具入口文件
 * @description 构建工具入口文件，所有任务都在此调用执行
 * @author huzi
 */

/*引入npm包*/
const gulp     = require('gulp')
const through2 = require('through2');
const path     = require('path');

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
        console.log('项目初始化...')

        var _self = this;

        _self.setting(config);

        var _config = config;
        console.log('项目初始化完成！')
    },

    /*配置config缓存*/
    setting: function(config) {
        global.Cache        = global.Cache || function(){return config};
        global.Cache.config = config;
        var _config         = global.Cache.config;
        _config.dirname     = _config.dirname.replace(/\\/g,'/');
        _config.srcPath     = path.join(_config.dirname, _config.path.src).replace(/\\/g,'/');
        _config.debugPath   = path.join(_config.dirname, _config.path.debug).replace(/\\/g,'/');
        _config.distPath    = path.join(_config.dirname, _config.path.dist).replace(/\\/g,'/');

    },

    /*开发环境构建*/
    devBuild: function(config) {
        var _self = this;

        sprite.init(() => {
            image.init(() => {
                less.init(() => {
                    js.init(() =>{
                        html.init(() => {
                            _self.watcher(() =>{});
                        });
                    });
                });
            });
        });


    },

    /*发布环境构建*/
    publishBuild: function(config) {
        var _self = this;



    },

    /*执行watch*/
    watcher: function(config) {
        var _self = this;

        watcher(config, () => {

        });


    }
}

module.exports = main;
