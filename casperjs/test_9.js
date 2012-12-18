var casper = require("casper").create({
	clientScripts:['jquery-1.8.3.min.js'],
	verbose: true,
	logLevel: 'debug'
});

var links;

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

casper.start('http://www.neimanmarcus.com.cn', function() {
	casper.page.injectJs('nodejs');
	var fs = require('fs');

	//read json from file
	var fileinfo;
	fileinfo = fs.open('links_list.json', 'r').read().trim();
	var readJson = eval(fileinfo);
	casper.log( "read link nubmer is :" + readJson.length + ", from file \"links_list.json\" ");
	//casper.log(allPrpos(fileinfo));
	casper.log(allPrpos(readJson));

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

casper.then(function() {
     // so we can pick an option with the select item below
});

casper.run(function() {
	var fs = require('fs');

	/*
	for(var i=0; i<links.length; i++){
		if ( links[i].search('http://') === -1 && links[i].search('#') === -1){
			this.echo('http://www.neimanmarcus.com.cn' + links[i]);
		}else{
			this.echo(links[i]);
		}		
	}
	//this.echo(allPrpos(links));
	//this.echo(JSON.stringify(links));
	*/
	var mydata=JSON.stringify(links);

	//save links to json file
    fs.write('links_list.json', mydata);
	casper.log("Log save to links_list.json");
    this.exit();
});