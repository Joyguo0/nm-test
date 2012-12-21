function setPageType(casper){
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