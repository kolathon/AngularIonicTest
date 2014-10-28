angular.module('ionicApp', [
    'ionic',
    'ui.router',
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
            .state('app.category', {
                url: '/category/:categoryId',
                views: {
                    'appContent': {
                        templateUrl: "category.html",
                        controller: "CategoryController"
                    }

                }
            })

        $urlRouterProvider.otherwise("/app/home");
    })

    .directive("categoryPage", function() {
        return {
            //allows transfer of parent scope variables
            scope: true,
            restrict : "E",
            templateUrl : "partials/category.html"
        }
    })

    .directive("homeTemplate", function() {
        return {
            restrict : "E",
            templateUrl : "partials/home.html"
        }
    });


//var app = angular.module('ionicApp', ['ionic']);

//app.config(function($stateProvider, $urlRouterProvider) {
//
//    $stateProvider
//        .state('app', {
//            url: "/app",
//            abstract: true,
//            templateUrl: "home.html",
//            controller: "AppController"
//        })
//        .state('app.home',{
//            url:"/app/home",
//            views: {
//                'menuContent': {
//                    templateUrl: 'partials/home.html'
//                }
//            }
//        })
//    ;
//
//    $urlRouterProvider.otherwise("/app/home");
//});
//
//
//app.controller('AppController', function($scope, $ionicSideMenuDelegate) {
//    $scope.toggleLeft = function() {
//        $ionicSideMenuDelegate.toggleLeft();
//    }
//});
//
//app.controller('HomeController', function($scope){
//
//});

//app.controller("SideController", function($scope, $http) {
//
//    //lets store this information somewhere for quicker recall
//    //check whether the localstorage has got something in
//    if(window.localStorage.getItem('categories')){
//       $scope.categories = window.localStorage.getItem('categories');
//    }else {
//        //lets get the categories from a JSON request
//        $http.get('http://www.occa-local.dev/appconnection/category/get/').
//            success(function (data, status, headers, config) {
//                $scope.categories = data;
//                $scope.loading = false;
//            }).
//            error(function (data, status, headers, config) {
//                //log the error
//            });
//        //stringify the JSON
//        var string = JSON.stringify($scope.categories);
//        //save this locally
//        window.localStorage.setItem('categories', string);
//    }
//
//});
//
//app.directive("ionCart", function() {
//    return {
//        restrict : "E",
//        templateUrl : "ionCart.html"
//    }
//});
//
//app.directive("ionPurchase", function() {
//    return {
//        restrict : "E",
//        templateUrl : "partials/home.html"
//    }
//});
//
//
////call in the categories
//function getCategories($scope, $http){
//    //lets check whether we are getting all or just some categories
//    if(typeof $scope.categoryId === 'undefined'){
//        //lets get the categories from a JSON request
//        $http.get('http://www.occa-local.dev/appconnection/category/get/').
//            success(function(data, status, headers, config){
//                $scope.categories = data;
//                $scope.loading = false;
//            }).
//            error(function(data,status,headers,config){
//                //log the error
//            });
//    }else{
//        //get some different information from the call
//        $http.get('http://www.occa-local.dev/appconnection/category/get/id/'+$scope.categoryId).
//            success(function(data, status, headers, config){
//                $scope.categories = data;
//                $scope.loading = false;
//
//            }).
//            error(function(data,status,headers,config){
//                //log the error
//                alert('there has been an error');
//            });
//
//    }
//}
//
////call in products
//function getProducts($scope, $http){
//    //get the ID that was passed in through the params
//    var id = $scope.categoryId;
//    alert($scope.categoryId);
//    //get some JSON
//    $http.get('http://www.occa-local.dev/appconnection/category/products/id/'+id).
//        success(function(data, status, headers, config){
//            $scope.products = data;
//            $scope.loading = false;
//        }).
//        error(function(data, status, headers, config){
//            //log the error that we have had.
//            alert('there has been an error');
//        });
//}
//
//function getItem($scope,$http){
//    var id = $scope.productId;
//
//    $http.get('http://www.occa-local.dev/appconnection/');
//}
