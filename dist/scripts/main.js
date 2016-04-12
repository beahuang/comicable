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
});

comicableApp.controller( 'issueReaderController', function( $scope ) {
    $scope.message = 'Issue Reader'

    $scope.imageUrl = 'images/batman-cover.jpg';
    $scope.counter = 0;
    $scope.maxPages = 30;
    $scope.nextImage = function() {
        if ($scope.counter >= $scope.maxPages) {
            $scope.imageUrl = 'images/batman-cover.jpg';
            $scope.counter = 0;
        } else {
            $scope.counter += 1;
            $scope.imageUrl = 'images/batman-' + $scope.counter + '.jpg';
        }
    };

    $scope.prevImage = function() {
        if ($scope.counter <= 1) {
            $scope.imageUrl = 'images/batman-cover.jpg';
        } else {
            $scope.counter -= 1;
            $scope.imageUrl = 'images/batman-' + $scope.counter + '.jpg';
        }
    };
})

comicableApp.controller( 'currentlyReadingController', function( $scope, $http ) {
    $scope.message = 'Currently Reading'

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/currentlyReading'
    }).then(function successCallback(response) {
        $scope.currentlyReading = response.data;
    });
})

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

comicableApp.controller( 'modalController', function( $scope, issue, ModalService, close ) {
  $scope.issue = issue;

  $scope.close = function( result ) {
    close(result, 500);
    $( 'body' ).removeClass( "modal-open" );
    $( '.modal-backdrop.in' ).remove();
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

comicableApp.controller( 'releasedIssuesController', function( $scope, ModalService, $http ) {
	$scope.message = 'New Releases: April 5 - 10'

	$http({
		method: 'GET',
		url: 'http://104.236.52.101/recentlyreleased'
	}).then(function successCallback( response ) {
		$scope.recentlyReleased = response.data;
		$scope.featuredIssue = $scope.recentlyReleased[ 0 ];
		$scope.recentlyReleased.shift();
	});

	$scope.showPurchaseDetails = function( $event ) {
		var issueData = $scope.parseComicElement( $event.currentTarget );
		console.log( issueData );
		ModalService.showModal( {
			templateUrl: "components/modals/purchase-details.html",
			controller: "modalController",
			inputs: {
				issue: issueData
			}
		} ).then( function( modal ) {
			modal.element.modal( issue );
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

	$scope.parseComicElement = function( comicElement ) {
		var comic_cover = comicElement.getElementsByClassName("data__cover")[0].src
		var comic_title = comicElement.getElementsByClassName("data__title")[0].innerHTML
		issue = {
			cover: comic_cover,
			title: comic_title,
			author: null,
			desc: null,
			price: null
		}
		return issue;
	}
})

comicableApp.controller( 'mySeriesController', function( $scope, ModalService, $http ) {
    $scope.message = 'Your Collection';

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/uploaded'
    }).then(function successCallback(response) {
        $scope.mySeries = response.data;
    });

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
            templateUrl: "components/modals/series-details.html",
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
        $scope.changeHeartClass();
    }

    $scope.showDropdown = function() {
        //TODO Show/hide dropdown party
    }

    $scope.uploadIssue = function() {
        var comicData = {
        };
        $http({
            url: '',
            method: 'POST',
            data: comicData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
        }).success(function (data, status) {
            // Reset $scope.comic_series
            $http({
                method: 'GET',
                url: '/someUrl'
            }).then(function successCallback(response) {
                for (var i = 0;  i < response.issue.length; i++) {
                    //unpack data
                }
                $scope.mySeries = response.mySeries;
            });
        });
    };
})
