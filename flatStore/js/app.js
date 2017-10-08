(function(){

	var app = angular.module('store' , []);

	var gem={
		name:'Dodecahedron',
		price: 2.95,
		description:'Lorem ipsum dolor sit amet',
		canPurchase: false,
		soldOut: true
	}

	var gems=[
	{
		name:'Dodecahedron',
		price: 2.95,
		description:'Lorem ipsum dolor sit amet',
		images:[
		{
			full:'public/img/d.jpg',
			thumb:'public/img/d.jpg'
		}
		],
		reviews: [
			{stars: 5, body: 'I love this product', author: 'alonso@gmail.com'},
			{stars: 5, body: 'I love this product', author: 'alonso@gmail.com'}
		]
	},

	{
		name:'Ruby',
		price: 1.95,
		description:'Lorem ipsum dolor sit amet',
		images:[
		{
			full:'public/img/ruby.jpg',
			thumb:'public/img/ruby.jpg'
		}
		],
		reviews: [
			{stars: 5, body: 'I love this product', author: 'alonso@gmail.com'},
			{stars: 5, body: 'I love this product', author: 'alonso@gmail.com'}
		]
	},

	{
		name:'Zafiro',
		price: 3.95,
		description:'Lorem ipsum dolor sit amet',
		images:[
		{
			full:'public/img/zafiro.jpg',
			thumb:'public/img/zafiro.jpg'
		}
		],
		reviews: [
			{stars: 5, body: 'I love this product', author: 'alonso@gmail.com'},
			{stars: 5, body: 'I love this product', author: 'alonso@gmail.com'}
		]
	}

	]
	app.controller('StoreController', function(){
		this.products = gems;
	});

	app.controller('PanelController', function(){
		this.tab = 1;

		this.selectTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab == checkTab;
		};
	});

	app.controller('ReviewController', function () {
		this.review = {};

		this.addReview = function(product) {
			product.reviews.push(this.review);
		}
	});

	app.directive('productTitle', function(){
		return{
			restrict: 'E',
			templateUrl: 'templates/product-title.html'
		}
	});

	app.directive('productPanels', function(){
		return{
			restric: 'E', 
			templateUrl: 'templates/product-panels.html',
			controller: function(){
				this.tab = 1;

				this.selectTab = function(setTab){
				this.tab = setTab;
				};
				this.isSelected = function(checkTab){
					return this.tab == checkTab;
				};
			},
			controllerAs: 'panel'
		}
	});
})();


