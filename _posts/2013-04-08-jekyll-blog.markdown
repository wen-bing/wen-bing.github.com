---
layout: post
title: "在Github上托管个人blog"
date: 2013-04-08 13:33
comments: true
categories: blog
description: "了解如何在Github Pages中使用Jekyll,搭建个人博客。如何配置Jekylly,如何发布博客"
tags: [Jekyll] 
---

[Github](http://pages.github.com)提供的Pages服务可以把相关的静态文件组合成一个博客站点。它不需要数据库，使用Git来管理博客的版本。你在本地写好文章（无需网络链接），在本地预览的文章效果，提交到Git仓库。发布文章的时候只需要Git Push一下就可以了。Github Pages是免费的，不限流量，而且速度非常快。

Github Pages使用[Jekyll](http://jekyllrb.com/)，是一个简洁的静态网站生成器， 来提供博客服务。Jekyll使用一个模板目录作为网站布局的基础框架，并在其上运行Textile，Markdown或Liquid标记语言的转换器，最终生成一个完整的静态Web站点，可以被放置在Apache或者你喜欢的其他任何Web服务器上。所以我们可以使用各种编辑器用Markdown语法来写博文。 

## 配置过程： ##

### Github ###

1. 安装Git以及Git的使用请[参考这里](http://rogerdudler.github.io/git-guide/index.zh.html)
2. 在Github上创建一个新的repo来管理blog，这个repos的名字必须是**USERNAME**.github.com。 如果你还没有Github账号，那请先[注册](http://github.com)一个。
3. 把这个新的repo clone到本地。

### Jekyll ###
Jekyll是基于Ruby实现的，所以安装Jekyll之前，需要先安装Ruby,以及Ruby的包管理工具gem。

1. 安装Ruby及Gem，请[参考这里](http://www.ruby-lang.org/zh_cn/downloads/)。
2. 执行如下命令安装Jekyll 
```
gem install jekyll
```
3. 手动配置Jekyll站点
一个Jekyll站点具有如下结构：
<pre>
    |-- _config.yml  
    |-- _includes  
    |-- _layouts  
    |-- default.html  
    |   -- post.html  
    |-- _posts  
    |   -- 2007-10-29-why-every-programmer-should-play-nethack.textile  
    |   -- 2009-04-26-barcamp-boston-4-roundup.textile  
    |-- _site  
    |-- index.html  
</pre>
具体过程请参考[这里](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

其实更快捷的做法是找到一个你喜欢的博客，然后把它clone下来，改成你自己的。Jekyll在[这里](https://github.com/mojombo/jekyll/wiki/Sites)列出了许多使用Jekyll的博客,可以打开看看，找到一个喜欢的主题风格，然后cone下来把它改成你自己的。我也是在网上找了好久，才发现现在这个主题（[@imkerberos](https://github.com/imkerberos)）是自己比较喜欢的，所以我在这里也借用一下。

4.Jekyll的配置  
主要的配置文件是_config.yml。在_config.yml中除了可以设置博客的常规信息之外，还默认自带了一些常用功能，如评论（disqus）、Analytics跟踪（Google Analytics）等等。详细教程见[这里](http://jekyllbootstrap.com/usage/blog-configuration.html)。


5.注意事项  
Jekyll在处理中文的时候会有问题，解决方法：

- 中文文件一定要保存为UTF-8格式
- 设置环境变量：
    <pre>
    LC_ALL=en_US.UTF-8
    LANG=en_US.UTF-8
    </pre>

### 本地预览 ###

在你的repo目录下，运行
```
jekyll --server
```
，然后再在浏览器里访问[localhost:4000](http://localhost:4000)，就可以看到你的博客网站了。

### 发布博客 ###
1. 把改好的Jekyll站点copy到前面clone到本地的**USERNAME**.github.com目录里，覆盖里面的内容。注意不要拷贝.git目录。
2. 在**USERNAME**.github.com目录/_posts/目录下创建你的博文。博文的文件名必须遵循下面的格式：YYYY-MM-DD-title.md
3. 在当前目录提交所有的改到到Git
4. git push **USERNAME**.github.com 到origin master分支。
5. 10分钟左右，就可以访问http://**USERNAME**.github.com来
访问你的博客了。

以后写博客就只需要在_posts下新建一个Markdown文件，然后在把这个文件提交，push到Github，就可以完成发布了。

### 其他选择  ###
 
如果你对Git不太熟，可以考虑使用[octopress](http://colors4.us/blog/2012/01/08/octopressbo-ke-cong-ling-kai-shi-i/)， octopres使用rake的任务来完成常见的git操作。 不过遗憾的是octopress push到Github上不是原始的markdown页面，而是翻译后的html，这样你需要一个额外的branch来保存原始的markdown博文，个人觉得不太方便。 

### 参考资料 ###

1. [http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
1. [http://www.soimort.org/posts/101/](http://www.soimort.org/posts/101/)
1. [http://equation85.github.io/blog/blog-with-github-and-jekyll/](http://equation85.github.io/blog/blog-with-github-and-jekyll/)
1. [http://colors4.us/blog/2012/01/08/octopressbo-ke-cong-ling-kai-shi-i/](http://colors4.us/blog/2012/01/08/octopressbo-ke-cong-ling-kai-shi-i/)



