var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    clientScripts: ["inc/jquery.min.js"]
});

var links = {
    'http://www.neimanmarcus.com.cn/casper/link.html': 0
};

casper.countLinks = function() {
    return this.evaluate(function() {
        return __utils__.findAll('a[href]');
    });
};

casper.renderJSON = function(what) {
    return this.echo(JSON.stringify(what, null, '  '));
};

casper.start(function(){
this.debugPage();
    
});

casper.each(Object.keys(links), function(casper, link) {
    this.thenOpen(link, function() {
        links[link] = this.countLinks();
    });
});

casper.run(function() {

    this.renderJSON(links).exit();
});