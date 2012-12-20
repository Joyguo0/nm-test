#Casperjs test case for Neiman Marcus China WebSite
============

##About Casperjs [![Build Status](https://secure.travis-ci.org/n1k0/casperjs.png)](http://travis-ci.org/n1k0/casperjs)
CasperJS is a navigation scripting & testing utility for [PhantomJS](http://www.phantomjs.org/).
It eases the process of defining a full navigation scenario and provides useful
high-level functions, methods & syntaxic sugar for doing common


##About Neiman Marcus [![Neiman Marcus](http://upload.wikimedia.org/wikipedia/en/thumb/8/84/Neiman_Marcus_logo.svg/200px-Neiman_Marcus_logo.svg.png)](http://www.neimanmarcus.com/)
Neiman Marcus, formerly Neiman-Marcus, is a luxury specialty retail department store operated by the Neiman Marcus Group in the United States.
The company is headquartered in the One Marcus Square building in Downtown Dallas, Texas, and competes with other department stores such as Saks Fifth Avenue, Barneys New York, Lord & Taylor, Nordstrom, Von Maur and Bloomingdale's.
The Neiman Marcus Group also owns Bergdorf Goodman specialty retail department stores on Fifth Avenue in New York City and a direct marketing division, Neiman Marcus Direct, which operates catalogue and online operations under the Horchow, Neiman Marcus and Bergdorf Goodman names.

##Neiman Marcus China WebSite
[![Neiman Marcus China](http://media.neimanmarcus.com.cn/skin/frontend/neiman/default/images/logo.gif)](http://www.neimanmarcus.com.cn/)

http://www.neimanmarcus.com.cn/


##About This Test Case

####1 Spide all link
- Spide link in one page.

```javascript
casper.start('http://www.neimanmarcus.com.cn', function() {
    links = this.evaluate(function() {
        var elements = __utils__.findAll('a[href]');
		var aArr = [];
		[].forEach.call(elements,function(el){
			var _href = el.getAttribute('href');
				if ( _href.search('http://') === -1 && _href.search('#') === -1){
					aArr.push('http://www.neimanmarcus.com.cn' + _href);
				}else{
					aArr.push(_href);
				}	
			}
		);
		return aArr;
    });
});
casper.run(function() {
	var mydata=JSON.stringify(links);
	casper.log(mydata);
    this.exit();
});
```

- Spide link in one website

```javascript
casper.run(function() {
	var mydata=JSON.stringify(links);
	casper.log(mydata);
    this.exit();
});
```


####2 Simula browser sbumit AJAX query

- put info into Dom value

- document.querySelectorAll('#dom > option');


####3 Save & read log
- call nodejs
```javascript
casper.page.injectJs('nodejs');
var fs = require('fs');
```

- use nodejs fs.open
```javascript
fileinfo = fs.open(myfilename, 'r').read().trim();
//change to json
readJson = eval(fileinfo);
```
- use nodejs fs.write
```javascript
fs.write(myfilename, mydata);
```

####4 Genetate repost
















