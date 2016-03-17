require( 'angular' )
require( 'angular-route' )

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
        templateUrl : 'components/my-series/ my-series.html',
        controller  : 'mySeriesController'
    })

    // route for the Released Issues page
    .when( '/released-issues', {
        templateUrl : 'components/released-issues.html',
        controller  : 'releasedIssuesController'
    })

    // route for the Reading List page
    .when( '/reading-list', {
        templateUrl : 'components/reading-list.html',
        controller  : 'readingListController'
    })

    .otherwise({
        redirectTo: '/'
    });
}]);
