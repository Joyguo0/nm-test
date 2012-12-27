##前言





#1 Casperjs 环境架设

###1.1 简介

CasperJS 是一个开源的导航脚本和测试工具，使用 JavaScript 基于 PhantomJS 编写，用于测试 Web 应用功能，Phantom JS是一个服务器端的 JavaScript API 的 WebKit。其支持各种Web标准： DOM 处理, CSS 选择器, JSON, Canvas, 和 SVG

可轻松的定义导航场景，提供一些很有用的高级函数、方法和语法糖用于定义常用的任务，如：

- 定义浏览和导航的顺序和步骤
- 填充并提交表单
- 点击链接
- 捕获网页的截图
- 对 DOM 进行断言测试
- 记录事件
- 下载资源，包括二进制内容
- 编写功能测试套件，并将结果存为 JUnit XML
- 抓取网页内容

###1.2 安装

####1.2.0 Casperjs 安装环境
Casperjs 基于 PhantomJS， 如果可能，请安装1.7及以后的版本。

	参考：如何安装PhantomJS

另外:请注意Casperjs是由Python语言编写，需要Python环境。

	参考：如何安装Python

####1.2.1 MAC & linux
#####如果你使用Homebrew， 那么只要一句命令即可:
```script
$ brew install casperjs
```
#####没有也没关系，我们可以通过GIT安装。
```script
$ git clone git://github.com/n1k0/casperjs.git
$ cd casperjs
//切换到最新的版本
$ git checkout tags/1.0.0
//添加casperjs目录进path
$ ln -sf `pwd`/bin/casperjs /usr/local/bin/casperjs
```
#####测试Casperjs 和 PhantomJS是否安装成功
```script
$ phantomjs --version
1.7
$ casperjs --version
1.0.0
```
另外，如果你不希望添加进path的话，可以进入bin目录，使用
```script
$ ./casperjs
```
来运行。

#####Ruby


####1.2.2 windows





#2 快速开始



#3 API
#4 命令行
#5 选择器
#6 
#7 
#8 
#9 
#10 
#11 





end


