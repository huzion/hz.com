/**
 * 构建工具入口文件
 * @description 构建工具入口文件，所有任务都在此调用执行
 * @author huzi
 */

/*引入npm包*/
const gulp     = require('gulp')
const through2 = require('through2');


/*引入构建模块*/
const js       = require('./lib/javscript');
const sprite   = require('./lib/sprite');
const image   = require('./lib/image');

var main = {
    /*初始化项目*/
    init: function(config) {
        console.log('项目初始化...')
        var _self = this;
        var _config = config;
        console.log('项目初始化完成！')
    },

    /*开发环境构建*/
    devBuild: function(config) {
        var _self = this;

        sprite.init(config, ()=> {
            image.init(config, ()=> {
                js.init(config,()=>{

                });
            })
        })


    },

    /*发布环境构建*/
    publishBuild: function(config) {
        var _self = this;



    }
}

module.exports = main;
