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
-

```javascript
casper.start('http://twitter.github.com/bootstrap/javascript.html#dropdowns', function() {
    this.test.assertExists('#navbar-example');
    this.click('#dropdowns .nav-pills .dropdown:last-of-type a.dropdown-toggle');
    this.waitUntilVisible('#dropdowns .nav-pills .open', function() {
        this.test.pass('Dropdown is open');
    });
});

casper.run(function() {
    this.test.done();
});
```


####2 Simula browser sbumit AJAX query

####3 Save & read log

####4 Genetate repost
















