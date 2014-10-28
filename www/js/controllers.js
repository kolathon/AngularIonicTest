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
        alert($stateParams.categoryId);
        alert($stateParams.subId);
        //get the category information from the JSON stored
        var categories = JSON.parse(localStorage.getItem('categories'));
        var subID = $stateParams.subId;
        var catID = $stateParams.categoryId;
        $scope.categories = categories[catID].categories[subID].categories;
    })
    //controller for the side navigation bar
    .controller("SideController", function($scope, $http) {
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

        //save this locally
    })


;