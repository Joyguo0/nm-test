var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});
var option=[];
var links={};
casper.start('http://www.neimanmarcus.com.cn/women/categories/dresses.html');

//casper.thenClick ('.first img');
casper.then (function(){
  
    this.evaluate(function() {
        document.querySelector('#designer').selectedIndex = 2;
        return true;
    });
   //this.evaluate(function (value) {
    //var options = document.querySelectorAll('#designer option');
   // for (var i = 1;i < options.length; i++) {
        //document.querySelector('#designer').value=options[i].value;
	//}
  // });
   
  this.evaluate(function() {
        var element = document.querySelector('#designer');
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', false, true);
        element.dispatchEvent(evt);
    });
  this.click("#designer");
});

casper.then(function() {
    casper.page.injectJs('nodejs'); // so we can pick an option with the select item below
});
casper.run(function() { 
	var mydata=links;
	 
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var myfile = "data-"+year + "-" + month + "-" + day+".txt";
	var fs = require('fs');
    fs.write(myfile, mydata);
	this.echo(JSON.stringify(links)).exit();
	  
});