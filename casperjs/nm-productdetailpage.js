var links=[];
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

	
var curl='http://www.neimanmarcus.com.cn/v03-0000002-00-000.html';

casper.start('http://www.neimanmarcus.com.cn/v03-0000002-00-000.html');

casper.then(function() {
    
     links = this.evaluate(function() {
        //var elements = __utils__.findAll('a');
		var l=document.querySelectorAll('a');
		var arr=[];
		function linkParameters(id,curl,ourl,title,type,s){
		  this.id=id;
		  this.curl=curl;
		  this.ourl=ourl;
		  this.title=title;
		  this.type=type;
		  this.status=s;
		}
		//var test=new linkParameters('1','xx','xxx','xx','productpage','true');
		//arr.push(test);
         //Array.prototype.forEach.call(elements, function(e) {
            //arr.push(e.getAttribute('href'));
        //});
	    for(var i=0;i<l.length;i++){
		  var ourl=l[i].getAttribute('href');
		  if(ourl&&ourl.indexOf('http')>-1){
			 arr.push(new linkParameters(i,'http://www.neimanmarcus.com.cn/v03-0000002-00-000.html',ourl,'','productpage','true'));
			
		  }
		}
		return arr;
	});
});

casper.then(function() {
    casper.page.injectJs('nodejs'); // so we can pick an option with the select item below
});

casper.run(function() { 
	var mydata=JSON.stringify(links);
	var linkarr=[];
	 function linkParameters(id,curl,ourl,title,type,s){
		  this.id=id;
		  this.curl=curl;
		  this.ourl=ourl;
		  this.title=title;
		  this.type=type;
		  this.status=s;
		}
		 //
		// for(var i=0;i<links.length;i++){
		  //var ourl=links[i];
		  //if(ourl&&ourl.indexOf('http')>-1){
			 //linkarr.push(new linkParameters(i,'http://www.neimanmarcus.com.cn/v03-0000002-00-000.html',ourl,'','productpage','true'));
		  //}
		//}
		
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hour=currentTime.getHours();
	var min=currentTime.getMinutes();
	var myfile = "data-"+year + "-" + month + "-" + day+"-"+hour+"-"+min+".txt";
	var fs = require('fs');
    fs.write(myfile, JSON.stringify(linkarr));
	this.echo(mydata).exit();
	  
});