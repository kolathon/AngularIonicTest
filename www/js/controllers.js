angular.module('ionicApp')
    .controller('AppController', function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    //controller for the home page
    .controller("HomeController", function($scope) {

    })
    //controller for the category pages
    .controller("CategoryController", function($scope, $http, $stateParams){


        if(localStorage.getItem('categories') && $stateParams.categoryId){
            var categories = JSON.parse(localStorage.getItem('categories'));
            //loop through the categories to get the one that we want
            var categoryID = $stateParams.categoryId;
            $scope.categoryId = $stateParams.categoryId;
            $scope.categories = categories[categoryID].categories;
        }else {
            //try and get the stored JSON category information
            $scope.categoryId = $stateParams.categoryId;
            $http.get('http://www.occa-local.dev/appconnection/category/get/id/' + $scope.categoryId).
                success(function (data, status, headers, config) {
                    $scope.categories = data;
                    $scope.loading = false;
                    //convert the categories to a string
                    var string = JSON.stringify(data);
                    //save them locally
                    localStorage.setItem('categories', string);

                }).
                error(function (data, status, headers, config) {
                    //log the error
                });
        }
    })
    //sub category controller
    .controller("SubController", function($scope, $http, $stateParams){
        //get the category information from the JSON stored
        var categories = JSON.parse(localStorage.getItem('categories'));
        var subID = $stateParams.subId;
        var catID = $stateParams.categoryId;
        $scope.categories = categories[catID].categories[subID].categories;
    })
    //controller for the side navigation bar
    .controller("SideController", function($scope, $http) {
        if (localStorage.getItem('categories')) {
            $scope.categories = JSON.parse(localStorage.getItem('categories'));
        } else {
            //lets get the categories from a JSON request
            $http.get('http://www.occa-local.dev/appconnection/category/get/').
                success(function (data, status, headers, config) {
                    $scope.categories = data;
                    $scope.loading = false;
                    //stringify the JSON

                }).
                error(function (data, status, headers, config) {
                    //log the error
                });

            //close the left bar
            //$scope.toggleLeft = function() {
            //    $ionicSideMenuDelegate.toggleLeft();
            //};
        }
    })
    //Product List Controller
    .controller("ListController", function($scope, $http, $stateParams) {
        //save this information locally - it will speed up product load and category load if a customer switches between products

        //check if there are some saved products
        if(localStorage.getItem('products')){
            //check whether the ID on the JSON correlates to the one we want
            var products = JSON.parse(localStorage.getItem('products'));
            if(products.id === $stateParams.categoryId){
                $scope.category = products;
                $scope.loading = false;
            }
        }
        if(typeof $scope.category === "undefined"){
            //make sure there is a category ID set
            $scope.categoryId = $stateParams.categoryId;
            //AJAX for JSON
            $http.get('http://www.occa-local.dev/appconnection/product/get/id/' + $scope.categoryId)
                .success(function (data, status, headers, config) {
                    $scope.category = data;
                    var string = JSON.stringify(data);
                    //set this in local storage
                    localStorage.setItem('products', string);
                    $scope.loading = false;
                })
                .error(function (data, status, headers, config) {
                    //some error function
                    alert('there was a problem with the list controller')
                });
        }

    })
    //Product Detail Controller
    .controller("ProductController", function($scope, $stateParams) {
        //get the details from the localStorage
        var category = JSON.parse(localStorage.getItem('products'));
        var productId = $stateParams.productId;
        $scope.product = category.products[productId];
    })

;