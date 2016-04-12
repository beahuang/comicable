var comicableApp = angular.module( 'comicableApp',
                                    [
                                     'ngRoute',
                                     'angularModalService',
                                     'mb-adaptive-backgrounds'
                                    ] )

comicableApp.config( ['$routeProvider',
function( $routeProvider ) {

    $routeProvider

    // route for the landing page
    .when( '/login', {
        templateUrl : 'components/login/login.html',
        controller  : 'loginController'
    })

    // route for the My Series page
    .when( '/my-series', {
        templateUrl : 'components/my-series/my-series.html',
        controller  : 'mySeriesController',
        activetab   : 'my-series'
    })

    // route for the Released Issues page
    .when( '/released-issues', {
        templateUrl : 'components/released-issues/released-issues.html',
        controller  : 'releasedIssuesController',
        activetab   : 'released-issues'
    })

    // route for the Currently Reading page
    .when( '/currently-reading', {
        templateUrl : 'components/currently-reading/currently-reading.html',
        controller  : 'currentlyReadingController',
        activetab   : 'currently-reading'
    })

    // route for the My Favorites page
    .when( '/issue-reader', {
        templateUrl : 'components/issue-reader/issue-reader.html',
        controller  : 'issueReaderController'
    })

    .otherwise({
        redirectTo: '/released-issues',
        activetab   : 'released-issues'
    });
}]);

comicableApp.controller( 'mainController', function ( $scope, $route ) {
    $scope.activeTab = $scope.$route = $route;
    $scope.searchTitle = '';
    $scope.ordering = '';
});
