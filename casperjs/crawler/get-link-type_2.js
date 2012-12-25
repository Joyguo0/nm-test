var casper = require("casper").create({
	//clientScripts: ["/nm-links/casperjs/includes/function.js"],
	verbose: true,
	logLevel: 'debug'
});
var fs = require('fs');
var links, results = [];
var targetSite = 'http://www.neimanmarcus.com.cn/';
links = fs.open('/nm-links/sedlog1.txt', 'r').read().trim().split('\r\n');

function getPageType(casper){
	if (casper.exists('body.cms-page-view')){
		return 4;
	}else if (casper.exists('body.catalog-product-view')){
		return 3;
	}else if (casper.exists('body.catalog-category-view')){
		if (casper.exists('.category-filter')){
			return 2;
		}else{
			return 1;
		}
	}else{
		return 5;
	}
}

casper.start(targetSite,function(){
	casper.page.injectJs('nodejs');
	casper.each(links, function(self, link, num) {
		var _status = false, _type = 0;
		self.thenOpen(link, function() {
			//this.echo(num);
			_status = casper.currentHTTPStatus;
			if (_status === 200){
				if (getPageType(this) == 2){
					results.push(link);
				};
			}
		})
	});
})





casper.run(function() {

//var mydata=JSON.stringify(results);

//save links to json file
    fs.write('/nm-links/reports/filterLinks.txt', results.join('\r\n'));
	casper.log("Log saved.");
    this.exit();	
});