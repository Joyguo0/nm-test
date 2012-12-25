var casper = require("casper").create({
	//clientScripts: ["/nm-links/casperjs/includes/function.js"],
	verbose: true,
	logLevel: 'debug'
});
var fs = require('fs');
var filter_links, results = [];
var targetSite = 'http://www.neimanmarcus.com.cn/';
filter_links = fs.open('/nm-links/reports/filterLinks.txt', 'r').read().trim().split('\r\n');
//filter_links = ['http://www.neimanmarcus.com.cn/women/categories/dresses.html'];

var links = "";
var sizes = "";
var categories = "";
var typesize_url = "";
var design_urls = "";
var typesize_urls = "";
var page_title = ""

function to_array(current_url,url_group){
	
	//var fileinfo = fs.open('reports/links_list.json', 'r').read().trim();
	var fileinfo = '';
	
	var file_links;
	var links_array = url_group.split(';');
	var new_links = new Array();
	var i;
	console.log(links_array.length);
	for (i = 0; i < links_array.length-1; i++){
		var url_item = new Object(); 
		
			var page_info = links_array[i].split('|');
			var same = false;
			if (page_info.length > 1) {
				var temp_openingurl = current_url + page_info[0];
				if (fileinfo != '') {
					var readJson = eval(fileinfo);	
					//console.log(readJson.length);
					for (file_links = 0; file_links < readJson.length; file_links++) {
						if (readJson[file_links].openingurl == temp_openingurl) {
							same = true;
							break;	
						} 
						new_links[file_links] = readJson[file_links];
					}
					star_num = readJson.length + (i +1);
				} else {
					star_num = i+1;
				}
				if (same == false) {
					url_item.num = star_num;
					url_item.openingurl = current_url + page_info[0];
					url_item.title = page_info[1];
					url_item.currenturl = current_url;
					url_item.type = '2';
					url_item.status = false;
				}
			}
		
		//links_array[i] = url_item;
		new_links.push(url_item);
		//console.log(links_array[i]);		
	}	
	
	return new_links;	
}

casper.start(targetSite,function(){
	casper.page.injectJs('nodejs');
	casper.each(filter_links, function(self, filter_link, num) {
		self.thenOpen(filter_link, function() {
			page_title = this.getTitle();
			this.echo("page_title:"+page_title);
			if (this.exists('#designer')) {
				links = this.evaluate(function(){
					var design_option = document.querySelectorAll('#designer > option');
					var page_title = document.querySelector('title').innerHTML;
					var i;
					var url_group = "";
					for (i = 0; i < design_option.length; i++) {
						if (design_option[i].getAttribute('value')!=0) {
							url_group = url_group + '?designer='+ design_option[i].getAttribute('value') +'&limit=null&order=null&dir=null|'+ page_title +'- Designer/ '+ design_option[i].innerHTML +';';	
							//console.log(url_group);
						}
					};
					return url_group;		
				})
			}
			if (this.exists('#categoryType') && this.exists('#sizeSelect')) {
				
				if (!this.visible('#categoryType')) {
					sizes = this.evaluate(function(){
						var size_option = document.querySelectorAll('#sizeSelect > option');
						var page_title = document.querySelector('title').innerHTML;
						var i;
						var url_size = "";
						for (i = 0; i < size_option.length; i++) {
							if (size_option[i].getAttribute('value')!=0) {
								url_size = url_size + '?size='+size_option[i].getAttribute('value')+'&type=all&order=null&dir=null|'+ page_title +'- type/ all'+ size_option[i].innerHTML +';';
								//console.log(url_size);	
							}
						}
						return url_size;
					});
				} else {
					categories = this.evaluate(function(){
						var typesize = document.querySelector('#casperjs_filter_json');
						var page_title = document.querySelector('title').innerHTML;
						//console.log(typesize.innerHTML);
						//console.log(JSON.parse(typesize.innerHTML));
						var typesize_json =  JSON.parse(typesize.innerHTML);
						var category_option = document.querySelectorAll('#categoryType > option');
						var i;
						var url_group = "";
						var maps = typesize_json.map;
						if (isNaN(maps.length)) {
							jQuery.each(maps,function(i,n){
									jQuery.each(n,function(j,m){
										jQuery.each(typesize_json.type,function(k,l){
											if (i == k) {
												type_name = l;		
											} else {
												return;	
											}	
										})
										url_group = url_group + '?size='+ j +'&type='+ i +'&order=null&dir=null|'+ page_title +'- type/'+ type_name +' - size/'+ m +';';															
										//console.log(url_group);
									});
							});
						}
						return url_group;
					})	
						
					
				}
			}
			typesize_url = links + sizes + categories;
		}).then(function(){
			var current_url = this.getCurrentUrl();	
			typesize_urls = to_array(current_url,typesize_url);
			for (var i=0; i<typesize_urls.length; i++){
				results.push(typesize_urls[i].openingurl);
			}
			
		});
		fs.write('/nm-links/reports/filterLinks-sub-' + num + '.txt', results.join('\r\n'));
	});
})





casper.run(function() {

//var mydata=JSON.stringify(results);

//save links to json file
    fs.write('/nm-links/reports/filterLinks-sub.txt', results.join('\r\n'));
	casper.log("Log saved.");
    this.exit();	
});