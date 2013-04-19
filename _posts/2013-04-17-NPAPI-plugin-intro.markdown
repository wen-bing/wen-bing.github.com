---
layout: post
title: "浏览器插件(Plugins)开发 - I"
date: 2013-04-17
comments: true
categories: NPAPI Plugin
tags: [Webkit, NPAPI, plugin]
---
## 什么是浏览器插件
浏览器插件其实就是一个动态库,它被浏览器动态地加载。浏览器插件可以用来扩充浏览器的功能，比如: 

+ 多媒体的表现能力，例如Flash Player插件用来在网页上播放视频
+ 保护用户信息安全，例如网上银行的插件，提供交易安全保证  

在浏览器地址栏输入如下命令，可以查看你的浏览器都安装了哪些插件：
Firefox下：
```
about:plugins
```
，Chrome下：
```
chrome://plugins
```

FireFox会把系统里的安装的Plugins全部列出来，而且还列出了插件对应的动态库文件名，版本，特别需要注意的是插件支持的[MIME Type](https://zh.wikipedia.org/zh-cn/MIME)，这个浏览器决定加载某个插件的重要依据,后文会继续解释。

## 什么是NPAPI
NPAPI(Netscape Plugin Application Programming Interface )是Mozilla公司提出的一套开发浏览器插件的API接口。(世界上最早的浏览器就是Mozilla开发的Netscape，虽然它后来被IE给打败了)。现在大部分浏览器都兼容这个接口，例如Chrome，Safari，FireFox, Opera，因而如果基于NPAPI开发的插件可以跨浏览器，IE除外。当然微软也搞了一套自己的接口，那就是ActiveX。Google在Chrome中也另搞了一套API:[Pepper API](https://developers.google.com/native-client/pepperc/),当然Chrome还是兼容NPAPI的。

NPAPI是一套Ｃ/C++的开发接口。基于NPAPI开发的插件可以实现如下功能：

* 注册插件能够处理的MIME类型
* 在浏览器窗口内显示插件所要显示的内容
* 收到和处理键盘/鼠标事件
* 通过URL从网络获取数据
* 使用URL的形式发布插件产生的数据
* 提供网页Javascipt代码可以调用的API接口，让网页JS代码调用插件的C/C++代码;插件也可以通过调用Javascript代码来操作DOM

## 插件是如何被加载的
当浏览器启动的时候，它会去系统的固定的目录中搜索所有的动态库读取动态库资源中的关于MIME类型部分，同时把这个MIME类型和对应的动态库在内存中缓存起来。

当用户在浏览器中打开某个html页面时，如果它检测到了一个<object>或者<embered>标签， 浏览器会检查这个标签的type属性，根据type属性指定的MIME类型，去寻找对应的插件。 如果浏览器在缓存中到了这个MIME类型的注册信息(即这个MIME类型有对应的动态库)， 那么浏览器再执行下面的动作：

1. 浏览器检查对应的插件是否已经加载，如果没有加载，第2步；如果加载了，则第4步
2. 浏览器加载动态库到内存
3. 浏览器初始化动态库
4. 浏览器创建一个新的插件实例

**注意**: 浏览器会为每个MIME标签创建一个插件实例，即使是在同一个网页里。

如果浏览器找不到这个MIME类型的注册信息，不同的浏览器会显示不同的错误信息。

## 插件的卸载

当用户关闭页面的时候，浏览器会销毁这个页面上对应的所有插件实例，如果这个插件的最后一个实例被销毁了，那么浏览器就会从内存中卸载掉这个插件。

## 网页中如何包含一个插件标签:
在网页中插入一个插件标签可以通过object或者embed：

插入Flash:

```
<object type="application/x-shockwave-flash" data="http://static.youku.com/v1.0.0852/v/swf/ikuadapter.swf" id="ikuadapter_swf" width="100%" height="100%"><param name="allowscriptaccess" value="always"><param name="allowNetworking" value="all"><param name="movie" value="http://static.youku.com/v1.0.0852/v/swf/ikuadapter.swf"></object>
```

```
<embed src="audiplay.aiff" type="audio/x-aiff" hidden="false">
```

**注意**： 不可见的插件是不起作用的，浏览器也不会创建对应的插件实例。


##插件的安装路径
通常浏览器会去下面的路径检查插件和插件的MIME类型：

### Windows

* Directory pointed to by ```MOZ_PLUGIN_PATH``` environment variable.
* ```%APPDATA%``` \Mozilla\plugins
* ```Application dir``` \plugins
* Plug-ins within toolkit bundles.
* ```Profile directory\plugins```, where Profile directory is a user profile directory.
* Directories pointed to by ```HKEY_CURRENT_USER\Software\MozillaPlugins\*\Path``` registry value, where * can be replaced by any name.
* Directories pointed to by ```HKEY_LOCAL_MACHINE\Software\MozillaPlugins\*\Path``` registry value, where * can be replaced by any name.

### Linux

* Directory pointed to by ```MOZ_PLUGIN_PATH``` environment variable.
* ```~/.mozilla/plugins```.
* ```Application directory/plugins```, where Application directory is a directory where the application is installed.
* ```/usr/lib/mozilla/plugins``` (on 64-bit systems, ```/usr/lib64/mozilla/plugins``` is used instead).
* Plug-ins within toolkit bundles.
* ```Profile directory/plugins```, where ```Profile directory``` is a user profile directory.

### Mac

* ```Application directory/plugins```, where Application directory is a directory where the application is installed.
* ```~/Library/Internet Plug-Ins```.
* ```/Library/Internet Plug-Ins```.
* ```/System/Library/Frameworks/JavaVM.framework/Versions/Current/Resources```.
* Plug-ins within toolkit bundles.
* ```Profile directory/plugins```, where Profile directory is a user profile directory.

