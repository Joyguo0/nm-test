var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});
casper.start('http://www.glamour-sales.com.cn')
casper.thenOpen('http://www.neimanmarcus.com.cn/');
casper.thenOpen('http://www.neimanmarcus.com.cn/designer-home');
casper.back();
casper.run(function() {
    console.log(this.getCurrentUrl()); // 'http://foo.bar/2'
    this.echo(this.getCurrentUrl()).exit();
});