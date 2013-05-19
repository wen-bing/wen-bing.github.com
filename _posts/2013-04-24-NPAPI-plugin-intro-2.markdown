---
layout: post
title: "浏览器插件(Plugins)开发 - II"
date: 2013-04-24
comments: true
description: "介绍NPAPI开发浏览器插件， 什么是NPAPI, 如何用NPAPI创建插件，如何绘制插件，浏览器与插件的消息交换"
categories: NPAPI Plugin
tags: [Webkit, NPAPI, plugin]
---

在[前文](/blog/2013-04-17/NPAPI-plugin-intro)中介绍了，浏览器插件实际上就是一个动态库(.dll/.so/.dylib)。那么这个动态库应该如何被加载，什么时候初始化自己，如何响应用户的操作，如何显示自己的内容等等，这些需要一个规范。而NPAPI就是这样的一套规范API。

NPAPI包含了一整套的API接口，它分为浏览器端的API接口(规定了可以被插件调用的API),和插件上的API接口(可以被浏览器调用的API)两部分。浏览器和插件通过调用特定的API来实现相互之间的交互。浏览器端的API都是以```NPN_xxx``` 形式命名的，而插件端的API都是以```NPP_xxx``` 形式命名的。插件上还有3个方法的命名不在这个规则中，这个3个方法是：

	NP_Initialize
	NP_Shutdown
	NP_GetEntryPoint

这个3个方法是浏览器用来初始化插件，关闭插件的，因而在动态库中必须是可见的，所以应该放在```extern "C" ```中。

```
extern "C" {  
  NPError NP_Initialize(NPNetscapeFuncs *browserFuncs);  
  NPError NP_GetEntryPoints(NPPluginFuncs *pluginFuncs);  
  void NP_Shutdown(void);   
}  
```

[前文](/blog/2013-04-17/NPAPI-plugin-intro)介绍了浏览器在检查到了一个插件对应的Tag后，会查找，加载插件，然后再初始化插件，创建插件实例。那么从code的角度，浏览器是如何做的呢？

### 注册Plugin
浏览器在启动的时候，会plugin的目录下，读取每个plugin的MIME类型，然后把他们的对应关系缓存起来。这个过程在不同的平台有不同的实现方式，这个过程也与NPAPI无关。

### 初始化Plugin
当浏览器需要为某个MIME创建一个plugin的实例时候，如果plugin还没有加载浏， 览器会调用Ｐlugin的[NP_Initialize](https://developer.mozilla.org/en-US/docs/NP_Initialize) 方法。 如果plugin已经加载了，那浏览器就直接去创建plugin的实例。 

### 创建Plugin实例
浏览器会调用plugin的[NPP_New](https://developer.mozilla.org/en-US/docs/NPP_New) 方法来创建一个Plugin实例， 浏览器会为页面上的每个MIME类型调用一次NPP_NEW来创建对应的插件实例， 所以如果同一个页面里也有可能有多个Plugin的实例会被创建。

### Plugin的显示
创建plugin很多时候是因为浏览器无法显示我们的想要的内容，比如用flash来播放视频，动画。Plugin在创建的时候可以分为有窗口型和无窗口型，这两种类型的plugin在显示，绘制自己的时候差别很大。Plugin可以在NPP_NEW方法里通过API [NPN_SetValue](https://developer.mozilla.org/en-US/docs/NPN_SetValue)来设置自己的类型。 下面的代码片段是设置Plugin为无窗口类型：

```
NPN_Setvalue(plugin_Instance, NPPVpluginWindowBool, (void*)false);
```

#### 窗口型(Window)
窗口型Plugin, 浏览器会为插件创建一个本地窗口，然后通调用[NPP_SetWindow](https://developer.mozilla.org/en-US/docs/NPP_SetWindow)方法传给插件。插件自己负责自己窗口内的显示。窗口型的插件的好处是，插件可以拥有一个本地窗口，那么就可以像开发本地桌面应用一样， 它的缺点它会总是在当前页面的所有HTML标签的最上面，不能被其他标签覆盖，这样有些CSS效果就要失效了，比如即使设置了zindex也还是会被插件窗口覆盖。

#### 无窗口型(Windowless)
无窗口型插件的绘制实际上就是离屏渲染的概念。 浏览器在调用NPP_SetWindow方法时给插件传了一个Drawable，插件只能在浏览器指定的Drawable上显示自己。不同平台这个Drawable不一样。Windows下是HDC,Linux下是X11的Drawable(Pixmap), Mac下是CoreGraphics的context。而具体的绘制过程，则还是有浏览器来控制，当浏览器知道插件需要被重新绘制了，它会调用插件端的API： [NPP_HandleEvent](https://developer.mozilla.org/en-US/docs/NPP_HandleEvent),然插件绘制自己。 在API NPP_HandleEvent中浏览器会传递一个event对象：[NPEvent](https://developer.mozilla.org/en-US/docs/NPEvent)，它可以表示不同的事件，包括paint。

当然插件也可以通知浏览器，我需要重绘了。这个时候插件可以调用浏览器的API：[NPN_InvalidateRect](https://developer.mozilla.org/en-US/docs/NPN_InvalidateRect)。当插件调用了NPN_InvalidateRect之后，浏览器会在合适的时候（不是立即）调用插件的NPP_HandleEvent来重绘。虽然NPAPI也提供了一个[NPN_ForceRedraw](https://developer.mozilla.org/en-US/docs/NPN_ForceRedraw)的API，但是很多浏览器没有实现这个API,可能是因为这个API的杀伤力太大了吧。

到现在为止，我们就可以用NPAPI创建一个插件，并且让浏览器能加载我们的插件，还能显示我们自己的内容。当然要实现一个想Flash Player这样的插件，还是有很多工作要做的。

### 例子
下面的链接提供了一个很好的例子：
[https://code.google.com/p/npapi-chrome-plugin-simple-http/](https://code.google.com/p/npapi-chrome-plugin-simple-http/)

### 注意
在Windows下plugin的名字必须是np***.dll，否则浏览器不会注册你的plugin的。

### 参考
1. [https://developer.mozilla.org/en-US/docs/Gecko_Plugin_API_Reference/Plug-in_Basics](https://developer.mozilla.org/en-US/docs/Gecko_Plugin_API_Reference/Plug-in_Basics)
2. [https://developer.mozilla.org/en-US/docs/Gecko_Plugin_API_Reference/Plug-in_Development_Overview](https://developer.mozilla.org/en-US/docs/Gecko_Plugin_API_Reference/Plug-in_Development_Overview)









