var casper = require('casper').create({
    verbose: true/*,
    logLevel: "debug"*/
});

var logo = null;
casper.start('http://www.neimanmarcus.com.cn/designer-home', function() {
    logo = this.evaluate(function() {
        var imgUrl = document.querySelector('ul.list a').getAttribute('href');
        return imgUrl;
    });
});

casper.run(function() {
    this.echo(logo).exit();
});