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

var comicableApp = angular.module( 'comicableApp' );

comicableApp.controller( 'loginController', function( $scope ) {
    $scope.message = 'Login / Register';
});

comicableApp.controller( 'modalController', function( $scope, ModalService, close ) {

  $scope.close = function( result ) {
    close(result, 500);
  };

  $scope.inputDetails = function() {
      ModalService.showModal( {
          templateUrl: "components/modals/uploadDetails.html",
          controller: "modalController"
      } ).then( function( modal ) {
          modal.element.modal();
          modal.close.then( function( result ) {
              console.log( result );
          });
      });
  }

});

comicableApp.controller( 'myFavoritesController', function( $scope ) {
    $scope.message = 'Favorites List'
})

comicableApp.controller( 'mySeriesController', function( $scope, ModalService ) {
    $scope.message = 'My Series';

    $scope.show = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/upload.html",
            controller: "modalController"
        } ).then( function( modal ) {
            modal.element.modal();
            modal.close.then( function( result ) {
                console.log( result );
            });
        });
    }
})

comicableApp.controller( 'releasedIssuesController', function( $scope ) {
    $scope.message = 'Released Issues'
})
