angular.module('home.controllers', [])

    .controller('AppCtrl', function($scope) {
    })

    //custom controllers
    .controller('SidebarController', function($scope, $http){
       $scope.categories = self.getCategories($scope,$http);
    })

    .controller('HomeController', function($scope,$http){
    //set up the spinner for loading
        $scope.loading = true;
        $scope.categories = self.getCategories($scope,$http);
    })
    //get the information that is required for the category
    .controller('CategoryController', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
        $scope.loading = true;
        $scope.categoryId = $routeParams.categoryId;
        $scope.categories = self.getCategories($scope,$http);
    }])
    //pull in the product list data
    .controller('ProductController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
        $scope.loading = true;
        //assign the category ID to the query
        $scope.categoryId = $routeParams.categoryId;
        $scope.products = self.getProducts($scope,$http);
    }])
    .controller('DetailController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
        $scope.loading = true;
        //assign the productID to the query
        $scope.productID = $routeParams.productID;
        $scope.product = self.getItem($scope, $http);
    }]);

//call in the categories
function getCategories($scope, $http){
    //check whether there is some localstorage stuff
    if(window.localStorage.getItem('categories')){
        alert('here1');
        $scope.categories = window.localStorage.getItem('categories');
    } else {
        alert('here2');
        //lets check whether we are getting all or just some categories
        if (typeof $scope.categoryId === 'undefined') {
            //lets get the categories from a JSON request
            $http.get('http://www.occa-local.dev/appconnection/category/get/').
                success(function (data, status, headers, config) {
                    $scope.categories = data;
                    $scope.loading = false;
                    alert('here3');
                    //set the information within localstorage
                    //var localData = JSON.stringify(data);
                    window.localStorage.setItem('categories', localData);
                }).
                error(function (data, status, headers, config) {
                    //log the error
                });
        }
    }
}

//call in products
function getProducts($scope, $http){
    //get the ID that was passed in through the params
    var id = $scope.categoryId;
    //get some JSON
    $http.get('http://www.occa-local.dev/appconnection/category/products/id/'+id).
        success(function(data, status, headers, config){
            $scope.products = data;
            $scope.loading = false;
        }).
        error(function(data, status, headers, config){
            //log the error that we have had.
            alert('there has been an error');
        });
}
//call in the product information
function getItem($scope,$http){
    var id = $scope.productId;

    $http.get('http://www.occa-local.dev/appconnection/products/get/id'+id).
        success(function(data, status, headers, config){
            $scope.products = data;
            $scope.loading = false;
        }).
        error(function(data, status, headers, config){
            //make me aware
            alert('Error on getItem()');
        });
}
