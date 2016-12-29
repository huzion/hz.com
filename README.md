# hzBuilder
### 一个基于Gulp的前端构建项目

---
### 目标

* 以目录生成雪碧图及less，以目录名命名生成的雪碧图
* 雪碧图生成的less中，图片路径匹配相应域名
* js、less的压缩混淆
* 图片压缩混淆
* iconfont及相应css自动实现
* 以hash码作资源文件后缀做缓存
* 方便项目迁移及扩展
* 方便生成不同环境的资源文件以便调试及发布
* 方便多人协同模块化开发

### 安装
npm i

### 配置 hosts

### 配置nginx

### config.json
```
{
    "env": "local",
    "apiEnv": "test",
    "port": "7790",
    "prefix": "hz",
    "separator": "_",
    "domain": {
        "local": "local.hz.com",
        "dev": "dev.hz.com",
        "test": "test.hz.com",
        "rc": "rc.hz.com",
        "www": "www.hz.com"
    },
    "path": {
        "src": "./src",
        "debug": "./debug",
        "dist": "./dist",
        "map": "./maps"
    },
    "appJsPath": "app",
    "htmlViews": "",
    "coreJs": {
        "mods": [
            "jquery",
            "ejs"
        ],
        "name": "corelibs",
        "src": "./src/js/vender"
    }
}
```
### 运行静态
```
npm run dev
```
### 构建未压缩核心js库
```
npm run core
```
### 构建生产环境核心js库
```
npm run core:www
```
### 构建开发环境代码
```
npm run build:dev
```
### 构建测试环境代码
```
npm run build:test
```
### 构建release环境代码
```
npm run build:rc
```
### 构建生产环境代码
```
npm run build:www
```
### 目录说明
```
hz.com
│
├─build                                     //构建工具核心代码
├─debug                                     //本地构建生成debug目录
├─dist                                      //发布目录
├─maps                                      //maps文件存放目录
├─src                                       //源码目录
│  ├─html                                       //html
│  ├─img                                        //图片
│  │  └─sprite                                      //雪碧图生成后存放的目录
│  ├─js                                         //js
│  │  ├─_base                                        //基础模块目录
│  │  ├─_utils                                       //手写插件目录
│  │  ├─app                                          //业务代码目录
│  │  │  └─_common                                       //通用代码目录
│  │  └─vender                                       //核心库目录
│  ├─less                                       //less源码目录
│  └─sprite                                         //未合成的雪碧图文件目录
├─config.json                               //项目配置文件
├─gulpfile.js                               //gulp入口文件
├─package.json                              //npm包配置文件
└─README.md
```
