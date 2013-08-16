---
layout: post
title: "设置Emacs的中文输入法-ibus"
date: 2013-08-16
comments: true
categories: emacs
description: "Emacs 中文输入法"
tags: [emacs] 
---

最近决定迁移到Emacs上，所以一直在折腾，不过总算在Emacs上找到了Sublime的感觉了。 Emacs24自带了插件管理系统，可以很方便地安装各种第3方插件。不过在安装输入法的时候，费了点功夫，本文记录这个过程。

## 起步
学习emacs，阅读自带的Tutorial绝对是第一步。

### 插件管理

由于license的原因，Emacs24官方的插件仓库的数量很少了。而现在社区里比较活跃的有下面几个：
官方的[elpa](http://tromey.com/elpa/), [marmalade](http://marmalade-repo.org/packages/),和 [melpa](http://melpa.milkbox.net/packages/)。
添加这些仓库，需要修改emacs的配置文件，一般是~/.emacs,或者~/.emacs.d/init.el, 在.emacs中添加如下代码：
<pre>
(require 'package)
;; Add the original Emacs Lisp Package Archive
(add-to-list 'package-archives '("elpa" . "http://tromey.com/elpa/"))

;; Add the user-contributed repository
(add-to-list 'package-archives '("marmalade" . "http://marmalade-repo.org/packages/"))
(add-to-list 'package-archives '("melpa" . "http://melpa.milkbox.net/packages/") t)

(package-initialize)
</pre>
保存好.emacs后，可以重启一下emacs，或者执行下面的命令使设置启作用：```C-x C-e```

### 起步好帮手

对于新手来说，要记住emacs下的那么多命令，还有快捷键是很困难的事情。于是有人就写了一个插件[Starter Kit](https://github.com/technomancy/emacs-starter-kit), 来帮助人们方便地输入各种命令，让你使用emacs再也没有负担了。在配置好插件库后，就可以方便地安装 Starter-kit了：
<pre>
M-x package-refresh-contents    ;;更新本地索引
M-x package-list-packages       ;;可以在列出的包的里表中找到starter-kit,然后点开链接，再安装，或者执行下面的命令
M-x package-install
starter-kit
</pre>
Starter-kit会做一些默认的配置，比如隐藏了菜单，工具栏等，但是你可以通过M-x后，输入任何命令来执行同样的功能。

## 项目管理

Emacs本身是不支持Project的，只能通过第3方插件来管理。这里推荐[Graphene](https://github.com/rdallasgray/graphene), 这个插件能把Emacs，配置的最像Sublime了。
![screen](https://github-camo.global.ssl.fastly.net/a35f101607c4eb69ef635628429a5477b717309e/687474703a2f2f73332d65752d776573742d312e616d617a6f6e6177732e636f6d2f6772617068656e652f6772617068656e652e706e67)
有了它在浏览project中的文件时就很方便了，你可以通过前面提到的命令来安装graphene。安装完成之后，在.emacs里添加下面的代码：
<pre>
;;sublime liked project manager
(require 'graphene)
</pre>
重启emacs后，然后M-x，输入project-persistant-create来创建一个项目， project-persistant-find来打开一个项目。切换到目录窗口C-c s，切换回代码窗口：C-x o， 不必担心记不住命令，安装了starter-kit，之后都能自动提示，命令补全。

## 中文输入法

Ubuntu自带的ibus拼音输入法，所以希望在emacs里也可以使用这个拼音输入法。所幸有人开发了[ibus-el](https://github.com/pkg-ime/ibus-el)这个插件，根据文档上的说明配置一下.emacs，就可以了。
注意，系统可能要安装python-xlib库；系统的ibus已经能启动。下面是.emacs的配置：
<pre>
;;C-空格，默认是用来设置mark的起始位置的，使用了ibus之后，就冲突了，需要给它重新指定一个快捷键。
(global-set-key [?\S- ] 'set-mark-command)
;;ibus
(add-to-list 'load-path "~/.emacs.d/elpa/ibus-el")
(require 'ibus)  
(add-hook 'after-init-hook 'ibus-mode-on)
(global-set-key (kbd "C-=") 'ibus-toggle) ;;这里既是绑定上面设置的C+=快捷键到ibus中
;; Change cursor color depending on IBus status
(setq ibus-cursor-color '("red" "blue" "limegreen"))
</pre>

## 其他

暂时就记这么多，都说emacs很好用，很难学，关键还是要坚持。后面再继续学习org，w3m，收发邮件等。


