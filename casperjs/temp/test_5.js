var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    clientScripts: ["inc/jquery.min.js"]
});
var links = [];

function getLinks() {
    var links = __utils__.findAll('div.home-content a[href]');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href')
    });
}

casper.start('http://www.neimanmarcus.com.cn/', function() {
	//
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    //this.echo(JSON.stringify(links)).exit();
    this.echo(links);
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});