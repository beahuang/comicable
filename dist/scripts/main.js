var comicableApp = angular.module( 'comicableApp', ['ngRoute'] )

comicableApp.config( ['$routeProvider',
function( $routeProvider ) {

    $routeProvider

    // route for the landing page
    .when( '/', {
        templateUrl : 'components/login/login.html',
        controller  : 'loginController'
    })

    // route for the My Series page
    .when( '/my-series', {
        templateUrl : 'components/my-series/my-series.html',
        controller  : 'mySeriesController'
    })

    // route for the Released Issues page
    .when( '/released-issues', {
        templateUrl : 'components/released-issues/released-issues.html',
        controller  : 'releasedIssuesController'
    })

    // route for the My Favorites page
    .when( '/my-favorites', {
        templateUrl : 'components/my-favorites/my-favorites.html',
        controller  : 'myFavoritesController'
    })

    .otherwise({
        redirectTo: '/'
    });
}]);

var comicableApp = angular.module( 'comicableApp' );

comicableApp.controller( 'loginController', function( $scope ) {
    $scope.message = 'Login / Register';
});

comicableApp.controller( 'myFavoritesController', function( $scope ) {
    $scope.message = 'My Favorites Controller works'
})

comicableApp.controller( 'mySeriesController', function( $scope ) {
    $scope.message = 'My Series'
})

comicableApp.controller( 'releasedIssuesController', function( $scope ) {
    $scope.message = 'Released Issues Controller works'
})
