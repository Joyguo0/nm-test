var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    clientScripts: ["inc/jquery.min.js"]
});
var links = [];

function getLinks() {
    //var links = document.querySelectorAll('a[href]');
    var links =  __utils__.findAll('a[href]');
    return Array.prototype.map.call(links, function(e) {
        //console.log(e.getAttribute('href'));
        return e.getAttribute('href')
    });
    //console.log(links);
}

casper.start('http://www.glamour-sales.com.cn/xmas2012/shake.html', function() {
    // search for 'casperjs' from google form
    //this.fill('form[action="/search"]', { q: 'casperjs' }, true);
    this.wait(2000, function() {
        this.debugHTML();
    });
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(' - ' + links.join('\n - '));
    this.echo(links.length + ' links found:').exit();
});