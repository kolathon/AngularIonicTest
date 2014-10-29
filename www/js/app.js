angular.module('ionicApp', [
    'ionic',
    'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "app.html"
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'appContent' :{
                        templateUrl: "home.html",
                        controller : "HomeController"
                    }
                }
            })
            //parent categories
            .state('app.category', {
                url: '/category/:categoryId',
                views: {
                    'appContent': {
                        templateUrl: "category.html",
                        controller: "CategoryController"
                    }

                }
            })
            //sub categories - pass through the parent and the sub cat id
            .state('app.sub', {
                url:'/sub/:categoryId/:subId',
                views: {
                    'appContent' : {
                        templateUrl: "subcategory.html",
                        controller: "SubController"
                    }
                }
            })
            //list of products - should only require the category ID for the product as we are just pulling a list of products
            .state('app.list', {
                url:'/list/:categoryId',
                views: {
                    'appContent': {
                        templateUrl: "list.html",
                        controller: "ListController"
                    }
                }
            })
            //product details
            .state('app.details', {
                url: '/detail/:productId',
                views:{
                    'appContent': {
                        templateUrl: "product.html",
                        controller: "ProductController"
                    }
                }
            })

        $urlRouterProvider.otherwise("/app/home");
    })
;
