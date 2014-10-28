angular.module('ionicApp')
    .controller('AppController', function($scope, $ionicSideMenuDelegate) {
        alert('here2');
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })

    .controller("HomeController", function($scope) {

    })

    .controller("CategoryController", function($scope, $http, $stateParams){
        alert('here');
        $scope.categoryId = $stateParams.categoryId;
        $http.get('http://www.occa-local.dev/appconnection/category/get/id/'+ $scope.categoryId).
            success(function (data, status, headers, config) {
                $scope.categories = data;
                $scope.loading = false;
            }).
            error(function (data, status, headers, config) {
                //log the error
            });
    })

    .controller("SideController", function($scope, $http) {
        //lets get the categories from a JSON request
        $http.get('http://www.occa-local.dev/appconnection/category/get/').
            success(function (data, status, headers, config) {
                $scope.categories = data;
                $scope.loading = false;
            }).
            error(function (data, status, headers, config) {
                //log the error
            });
        //stringify the JSON
        var string = JSON.stringify($scope.categories);
        //save this locally
        window.localStorage.setItem('categories', string);
    });