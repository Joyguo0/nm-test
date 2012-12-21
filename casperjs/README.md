#Casperjs test case for Neiman Marcus China WebSite
============

##About Casperjs [![Build Status](https://secure.travis-ci.org/n1k0/casperjs.png)](http://travis-ci.org/n1k0/casperjs)
CasperJS is a navigation scripting & testing utility for [PhantomJS](http://www.phantomjs.org/).
It eases the process of defining a full navigation scenario and provides useful
high-level functions, methods & syntaxic sugar for doing common



##Script for key function

####1. Spide all link
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


####2. Simula browser sbumit AJAX query

- put info into Dom value

```javascript
document.querySelectorAll('#dom > option');
```


####3. Save & read log
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

####4. Genetate report

- bulid JSON

```javascript
var mydata=JSON.stringify(myinfomation);
var fs = require('fs');
fs.write(myfile, mydata);
```



##Web Crawler Report

- report template

```javascript
[
	{
	"num":"1",
	"openingurl":"http://www.neimanmarcus.com.cn/women/categories/bags.html",
	"changetourl":"http://www.neimanmarcus.com.cn/women/categories/bags/a01-0000024-99-068.html",
	"title":" Alexander McQueen - 花朵印花De-Manta手拿包",
	"type":"产品页面", 
	"status":"true",
	"http":"404"
	}
]
```
- description
<table class="table table-bordered table-striped table-condensed">
   <tr>
      <td>Parameter</td>
      <td>Description</td>
      <td>Detail</td>
   </tr>
   <tr>
      <td>num</td>
      <td>count number</td>
      <td>digatal</td>
   </tr>
   <tr>
      <td>openingurl</td>
      <td>opening web page</td>
      <td>URL adress, the old one</td>
   </tr>
   <tr>
      <td>currenturl</td>
      <td>new page</td>
      <td>URL adress</td>
   </tr>
   <tr>
      <td>title</td>
      <td>New page title</td>
      <td>need be encoded</td>
   </tr>
   <tr>
      <td>type</td>
      <td>page type</td>
      <td>
      - 1. Category page
      - 2. Category with fliter
      - 3. Product page
      - 4. CMS page
      - 5. Other 
      </td>
   </tr>
   <tr>
      <td>status</td>
      <td>Success or not</td>
      <td>"true" or "false"</td>
   </tr>
</table>

##Test Case

### 1. Login
### 2. Register
### 3. Filter Product
### 4. Search product
### 5. Add to cart
### 6. Check out


##About Neiman Marcus [![Neiman Marcus](http://upload.wikimedia.org/wikipedia/en/thumb/8/84/Neiman_Marcus_logo.svg/200px-Neiman_Marcus_logo.svg.png)](http://www.neimanmarcus.com/)
Neiman Marcus, formerly Neiman-Marcus, is a luxury specialty retail department store operated by the Neiman Marcus Group in the United States.
The company is headquartered in the One Marcus Square building in Downtown Dallas, Texas, and competes with other department stores such as Saks Fifth Avenue, Barneys New York, Lord & Taylor, Nordstrom, Von Maur and Bloomingdale's.
The Neiman Marcus Group also owns Bergdorf Goodman specialty retail department stores on Fifth Avenue in New York City and a direct marketing division, Neiman Marcus Direct, which operates catalogue and online operations under the Horchow, Neiman Marcus and Bergdorf Goodman names.

##Neiman Marcus China WebSite
[![Neiman Marcus China](http://media.neimanmarcus.com.cn/skin/frontend/neiman/default/images/logo.gif)](http://www.neimanmarcus.com.cn/)

http://www.neimanmarcus.com.cn/







