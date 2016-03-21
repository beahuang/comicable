var comicableApp = angular.module( 'comicableApp',
                                    [
                                     'ngRoute',
                                     'angularModalService'
                                    ] )

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
