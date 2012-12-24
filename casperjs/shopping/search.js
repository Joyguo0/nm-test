var links = [];
var casper = require("casper").create({
    loadImages: false,
    logLevel:   "debug",
    verbose:    true
});

casper.start("http://www.neimanmarcus.com.cn/", function() {
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', { q: "casperjs" }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    //links = this.evaluate(getLinks);
    // now search for 'phantomjs' by fillin the form again
    this.fill('form[id="search_mini_form"]', { q: "red" }, true);
});

casper.then(function() {
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