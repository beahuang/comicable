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

    // route for the Reading List page
    .when( '/reading-list', {
        templateUrl : 'components/released-issues/reading-list.html',
        controller  : 'readingListController'
    })

    .otherwise({
        redirectTo: '/'
    });
}]);

var comicableApp = angular.module( 'comicableApp' );

comicableApp.controller( 'loginController', function( $scope ) {
    $scope.message = 'Login Controller works';
});

comicableApp.controller( 'mySeriesController', function( $scope ) {
    $scope.message = 'My Series Controller works'
})

comicableApp.controller( 'releasedIssuesController', function( $scope ) {
    $scope.message = 'Released Issues Controller works'
})

comicableApp.controller( 'readingListController', function( $scope ) {
    $scope.message = 'Reading List Controller works'
})
