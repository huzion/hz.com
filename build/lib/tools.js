/**
 * 工具文件
 * @description 一些手写工具的集合
 */

/*引入模块*/
const fs    = require('fs');
const gutil = require('gulp-util');
const color = gutil.colors;

var tools = {
    /*获取全局config配置*/
    getConfig: function() {
        const config = global.Cache.config;
        return config
    },

    /*获取map json文件并转为object*/
    getMap: type => {
        var config = tools.getConfig();
        if(['css', 'img', 'js'].indexOf(type) > -1) {
            var _name = `${type}`;
            var _file = config.dirname + '/maps/' + _name + 'map.json';
            var obj = {};
            if(fs.existsSync(_file)) {
                var _source = fs.readFileSync(_file).toString('utf-8');
                obj = JSON.parse(_source);
                return obj;
            } else {
                gutil.log(color.red(type + 'map文件不存在！'));
                return false;
            }
        } else {
            gutil.log(color.red('获取' + type + 'map文件类型错误!'));
            return false;
        }
    },

    /*获取静态资源路径*/
    getStaticsPath: () => {
        var config = tools.getConfig();
        var _env = config._env
        var _domain = !!config.domain[_env] ? config.domain[_env] : 'localhost'
        var _staticPath = '//' + config.domain[_env];
        return _staticPath;
    },

    /*根据ejs在html中插入的方法解析调用的css文件*/
    init_css: string => {
        var config = tools.getConfig();
        var _arr = string.split(',');
        var mapObj = tools.getMap('css');
        var hashArr = [];
        var cssLink = '';
        var _cssPath = tools.getStaticsPath() + '/css';

        _arr.map(item => {
            var _name = item + '.css';

            if(!mapObj[_name]) {
                gutil.log(color.red(' "' + _cssPath + '/' + _name + '" 文件引用错误！'));
            } else {
                var _hashName = mapObj[_name]
                var _filePath = _cssPath + '/' + _hashName;
                hashArr.push(_filePath);
            }
        });

        hashArr.map(item => {
            cssLink = cssLink + '<link rel="stylesheet" type="text/css" href="' + item + '" />';
        });

        return cssLink;
    },

    /*根据ejs在html中插入的方法解析调用的js文件*/
    init_js: string => {
        var config = tools.getConfig();
        var _arr = string.split(',');
        var mapObj = tools.getMap('js');
        var hashArr = [];
        var jsLink = '';
        var _jsPath = tools.getStaticsPath() + '/js';

        _arr.map(item => {
            var _name = item + '.js';
            var _hashName;

            if(!mapObj[_name]) {
                gutil.log(color.red(' "' + _jsPath + '/' + _name + '" 文件没有生成hash码！'));
                _hashName = _name;
            } else {
                _hashName = mapObj[_name]
            }

            var _filePath = _jsPath + '/' + _hashName;
            hashArr.push(_filePath);
        });

        hashArr.map(item => {
            jsLink = jsLink + '<script type="text/javascript" src="' + item + '" />';
        });

        return jsLink;
    }
};
module.exports = tools;
