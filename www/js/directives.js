angular.module('ionicApp')
    //home page template
    .directive("homeTemplate", function() {
        return {
            restrict : "E",
            templateUrl : "partials/home.html"
        }
    })
    //main category page template
    .directive("categoryPage", function() {
        return {
            //allows transfer of parent scope variables
            scope: true,
            restrict : "E",
            templateUrl : "partials/category.html"
        }
    })
    //subcategory template
    .directive("subcategoryPage", function() {
        return{
            scope: true,
            restrict: "E",
            templateUrl : "partials/subcategory.html"
        }
    })

;