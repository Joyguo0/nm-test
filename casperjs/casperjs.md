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

####1.2.1 Mac & Linux
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
	$ ln -sf `pwd`/rubybin/casperjs /usr/local/bin/casperjs
或者
```script
$ ruby /path/to/casperjs/rubybin/casperjs
CasperJS version 1.0.0 at /Users/niko/Sites/casperjs, using PhantomJS version 1.7.0
...
```

####1.2.2 windows
架设你的Phantomjs安装在C盘根目录，你需要增加";C:\phantomjs;C:\casperjs\batchbin"进你的PATH

另外，在windows的命令行界面执行Phantomjs和casperjs是不会有彩色提示的。


#2 Hello web!

下面的例子里，我们会在用casperjs 在google上分别搜索casperjs 和phantomjs， 并把搜到的结果保存到数组中，并显示出来。

你可以使用自己喜欢的编辑器，把下面的javascript保存为googlelinks.js
```script
var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href')
    });
}

casper.start('http://google.fr/', function() {
    // search for 'casperjs' from google form
    // 在Google搜索表单里提交 casperjs
    this.fill('form[action="/search"]', { q: 'casperjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    // 搜索casperjs的返回结果
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    // 现在再搜索phantomjs
    this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    // 现在得到搜索phantomjs的结果
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    // 把输出搞的稍微好看点
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
```

运行它，屏幕输出会是这样：
```script
$ casperjs googlelinks.js
20 links found:
 - https://github.com/n1k0/casperjs
 - https://github.com/n1k0/casperjs/issues/2
 - https://github.com/n1k0/casperjs/tree/master/samples
 - https://github.com/n1k0/casperjs/commits/master/
 - http://www.facebook.com/people/Casper-Js/100000337260665
 - http://www.facebook.com/public/Casper-Js
 - http://hashtags.org/tag/CasperJS/
 - http://www.zerotohundred.com/newforums/members/casper-js.html
 - http://www.yellowpages.com/casper-wy/j-s-enterprises
 - http://local.trib.com/casper+wy/j+s+chinese+restaurant.zq.html
 - http://www.phantomjs.org/
 - http://code.google.com/p/phantomjs/
 - http://code.google.com/p/phantomjs/wiki/QuickStart
 - http://svay.com/blog/index/post/2011/08/31/Paris-JS-10-%3A-Introduction-%C3%A0-PhantomJS
 - https://github.com/ariya/phantomjs
 - http://dailyjs.com/2011/01/28/phantoms/
 - http://css.dzone.com/articles/phantom-js-alternative
 - http://pilvee.com/blog/tag/phantom-js/
 - http://ariya.blogspot.com/2011/01/phantomjs-minimalistic-headless-webkit.html
 - http://www.readwriteweb.com/hack/2011/03/phantomjs-the-power-of-webkit.php
```


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


