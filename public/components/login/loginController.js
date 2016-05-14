var comicableApp = angular.module( 'comicableApp' );

comicableApp.controller( 'loginController', function( $scope, $location ) {
    $scope.message = 'Login / Register';

    $scope.loginClass = "";
    $scope.toggleRegister = function() {
        if ($scope.loginClass === "") {
            $scope.loginClass = "show-register";
        } else {
            $scope.loginClass = "";
        }
    }

    $scope.showUser = function() {
        $( 'body' ).addClass( 'logged-in' );
        $location.path('/my-series');
    }
});
