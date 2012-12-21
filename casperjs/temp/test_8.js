var links = [];
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});


function allPrpos ( obj ) {
	var props = "" ;
	for ( var p in obj ){
		if ( typeof ( obj [ p ]) == " function " ){
			obj [ p ]() ;
		} else {
			props += p + " = " + obj [ p ] + " \t " ;
		}
	}
	return props ;
}


casper.start('http://www.neimanmarcus.com.cn/women/categories/dresses.html');
casper.then(function() {
    casper.page.injectJs('nodejs'); // so we can pick an option with the select item below
});

function countLinks() {
    return this.evaluate(function() {
        return __utils__.findAll('div').length;
    });
};



casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = this.evaluate(countLinks);
});

casper.run(function() {
	//links = this.countLinks();
	//this.echo(links);

	var mydata=JSON.stringify(links);
	 
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hour=currentTime.getHours();
	var min=currentTime.getMinutes();
	var myfile = "data-"+ year + "-" + month + "-" + day + "-" + hour + "-" + min + ".txt";
	var fs = require('fs');
    //fs.write(myfile, mydata);
	this.echo(JSON.stringify(links)).exit();
	  
});