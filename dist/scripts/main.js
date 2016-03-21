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

    // route for the My Favorites page
    .when( '/issue-reader', {
        templateUrl : 'components/issue-reader/issue-reader.html',
        controller  : 'issueReaderController'
    })

    .otherwise({
        redirectTo: '/'
    });
}]);

comicableApp.controller( 'issueReaderController', function( $scope ) {
    $scope.message = 'Issue Reader'
})

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
          templateUrl: "components/modals/upload-details.html",
          controller: "modalController"
      } ).then( function( modal ) {
          modal.element.modal();
          modal.close.then( function( result ) {
              console.log( result );
          });
      });
  }
  $scope.inputCreditCard = function() {
      ModalService.showModal( {
          templateUrl: "components/modals/card-details.html",
          controller: "modalController"
      } ).then( function( modal ) {
          modal.element.modal();
          modal.close.then( function( result ) {
              console.log( result );
          });
      });
  }
  $scope.confirmPurchase = function() {
      ModalService.showModal( {
          templateUrl: "components/modals/confirm-purchase.html",
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

    $scope.showDetails = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/show-details.html",
            controller: "modalController"
        } ).then( function( modal ) {
            modal.element.modal();
            modal.close.then( function( result ) {
                console.log( result );
            });
        });
    }

    $scope.addToFavorites = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/confirm.html",
            controller: "modalController"
        } ).then( function( modal ) {
            modal.element.modal();
            modal.close.then( function( result ) {
                $scope.changeHeartClass();
            });
        });
    }

    $scope.class = "";
    $scope.changeHeartClass = function() {
        if ($scope.class === "") {
            $scope.class = "favorited";
        } else {
            $scope.class = "";
        }
    }

    $scope.removeFromFavorites = function() {

    }
})

comicableApp.controller( 'releasedIssuesController', function( $scope, ModalService ) {
    $scope.message = 'Released Issues'

    $scope.showPurchaseDetails = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/show-purchase-details.html",
            controller: "modalController"
        } ).then( function( modal ) {
            modal.element.modal();
            modal.close.then( function( result ) {
                console.log( result );
            });
        });
    }
})
