// JavaScript Document
var casper = require('casper').create({
	clientScripts:  [
        'includes/jquery-1.8.1.min.js',     // These two scripts will be injected in remote
    	'reports/links.js'
	],
	verbose: true,
	logLevel: 'debug',
	onError: function(self,m) {
			this.capture('error.png');
			console.log('Fatal:'+m);
			self.exit();
		}	
	
});
var utils = require('utils');
var fs = require('fs');
var url = 'http://ray.test.neiman.com.cn/temp/filterview.html';
//var url = 'http://uji.neimanmarcus.com.cn/women/categories/topbottoms/tops.html';
//var url = 'http://www.neimanmarcus.com.cn/women/categories/tops.html';
var links = "";
var sizes = "";
var categories = "";
var typesize_url = "";
var design_urls = "";
var typesize_urls = "";
var page_title = ""
function to_array(current_url,url_group){

	var links_array = url_group.split(';');
	var i;
	for (i = 0; i < links_array.length; i++){
		var url_item = new Object(); 
		var page_info = links_array[i].split('|');
		url_item.num = i;
		if (page_info.length > 1) {
			
			url_item.openingurl = current_url + page_info[0];
			url_item.title = page_info[1];
		}
		
		url_item.currenturl = current_url;
		url_item.type = '产品分类过滤页面';
		url_item.status = true;
		links_array[i] = url_item;
		console.log(links_array[i]);		
	}	
	return links_array;	
}
	
casper.start(url,function(){
	casper.page.injectJs('nodejs');
	page_title = this.getTitle();
	console.log("page_title:"+page_title);
	if (this.exists('#designer')) {
		links = this.evaluate(function(){
			var design_option = document.querySelectorAll('#designer > option');
			var page_title = document.querySelector('title').innerHTML;
			var i;
			var url_group = "";
			for (i = 0; i < design_option.length; i++) {
				if (design_option[i].getAttribute('value')!=0) {
					url_group = url_group + '?designer='+ design_option[i].getAttribute('value') +'&limit=null&order=null&dir=null|'+ page_title +'- Designer/ '+ design_option[i].innerHTML +';';	
					console.log(url_group);
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
						console.log(url_size);	
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
	console.log(typesize_url)
	
});

casper.then(function(){
	var current_url = this.getCurrentUrl();	
	design_urls = to_array(current_url,links);
	typesize_urls = to_array(current_url,typesize_url);
})
casper.run(function(){
	
	//this.echo(design_urls);
	this.echo(typesize_urls);
	fs.write('reports/links_list.json', JSON.stringify(typesize_urls));
	this.exit();
	//this.echo(JSON.stringify(links)).exit();	
	
});
