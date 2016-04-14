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

comicableApp.controller( 'currentlyReadingController', function( $scope, $http ) {
    $scope.message = 'Currently Reading'

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/currentlyReading'
    }).then(function successCallback(response) {
        $scope.currentlyReading = response.data;
    });

    $scope.addToList = function() {
        $http({
            method: 'GET',
            url: 'http://104.236.52.101/uploaded'
        }).then(function successCallback(response) {
            $scope.uploaded = response.data;
        });
        console.log( $scope.uploaded );

        var id = null;

		var comicData = {
			currentlyReading: 1,
			comicId: id
		};

        $http({
            url: 'http://104.236.52.101/setCurrentlyReading',
            method: 'POST',
            data: comicData,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status) {
            $http({
                method: 'GET',
                url: 'http://104.236.52.101/currentlyReading'
            }).then(function successCallback(response) {
                $scope.currentlyReading = response.data;
            });
        });
    };
})


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

comicableApp.directive( "scroll", function ( $window ) {
	return function( scope, element, attrs ) {
		angular.element( $window ).bind( "scroll", function() {
			if ( this.pageYOffset >= 100 ) {
				scope.boolChangeClass = true;
			} else {
				scope.boolChangeClass = false;
			}
			scope.$apply();
		});
	};
});

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

comicableApp.controller( 'mySeriesController', function( $scope, ModalService, $http ) {
	$scope.message = 'Your Collection';
	$scope.ordering = '';
	$scope.az = false;
	$scope.za = false;
	$scope.filterFavorites = "";

	$http({
		method: 'GET',
		url: 'http://104.236.52.101/uploaded'
	}).then(function successCallback(response) {
		$scope.mySeries = response.data;
	});

	$scope.show = function() {
		ModalService.showModal( {
			templateUrl: "components/modals/upload.html",
			controller: "modalController",
			inputs: {
				issue: null
			}
		} ).then( function( modal ) {
			modal.element.modal();
			modal.close.then( function( result ) {
				$http({
					method: 'GET',
					url: 'http://104.236.52.101/uploaded'
				}).then(function successCallback(response) {
					$scope.mySeries = response.data;
				});
			});
		});
	}

	$scope.showDetails = function( $event ) {
		var issueData = $scope.parseComicElement( $event.currentTarget );
		ModalService.showModal( {
			templateUrl: "components/modals/series-details.html",
			controller: "modalController",
			inputs: {
				issue: issueData
			}
		}
	) }

	$scope.setFavorite = function( $event ) {
		var id = $event.currentTarget.parentNode.parentNode.getElementsByClassName( "data__comicId" )[ 0 ].innerHTML;

		var comicData = {
			favorite: 1,
			comicId: parseInt(id)
		};
		console.log( comicData );

		$http({
			url: 'http://104.236.52.101/favorites',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
		});
	};

	$scope.removeFromFavorites = function( $event ) {
		var id = $event.currentTarget.parentNode.parentNode.getElementsByClassName( "data__comicId" )[ 0 ].innerHTML;

		var comicData = {
			favorite: 0,
			comicId: parseInt(id),
		};

		$http({
			url: 'http://104.236.52.101/favorites',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
		});
	};


	$scope.setCurrentlyReading = function( $event ) {
		var id = $event.currentTarget.parentNode.parentNode.getElementsByClassName( "data__comicId" )[ 0 ].innerHTML;

		var comicData = {
			currentlyReading: 1,
			comicId: parseInt(id)
		};
		console.log( comicData );

		$http({
			url: 'http://104.236.52.101/setCurrentlyReading',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
		});
	};

	$scope.removeCurrentlyReading = function( $event ) {
		var id = $event.currentTarget.parentNode.parentNode.getElementsByClassName( "data__comicId" )[ 0 ].innerHTML;

		var comicData = {
			currentlyReading: 0,
			comicId: parseInt(id),
		};

		$http({
			url: 'http://104.236.52.101/setCurrentlyReading',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
		});
	};

	$scope.releaseDropOpen = false;
	$scope.showReleaseDrop = function() {
		$scope.releaseDropOpen = !$scope.releaseDropOpen;
	}

	$scope.alphaDropOpen = false;
	$scope.showAlphaDrop = function() {
		$scope.alphaDropOpen = !$scope.alphaDropOpen;
	}

	$scope.filterByFavorites = function() {
		if ( $scope.filterFavorites == 0 ) {
			$scope.filterFavorites = 1;
		} else if ( $scope.filterFavorites == 1 ) {
			$scope.filterFavorites = "";
		}
	}

	$scope.parseComicElement = function( comicElement ) {
		var comic_cover = comicElement.getElementsByClassName( "data__cover" )[ 0 ].src
		var comic_title = comicElement.getElementsByClassName( "data__title" )[ 0 ].innerHTML;
		var comic_author = comicElement.getElementsByClassName( "data__author" )[ 0 ].innerHTML;
		var comic_desc = comicElement.getElementsByClassName( "data__desc" )[ 0 ].innerHTML;
		issue = {
			cover: comic_cover,
			title: comic_title,
			author: comic_author,
			desc: comic_desc
		}
		return issue;
	}
})

comicableApp.controller( 'modalController', function( $scope, $http, issue, ModalService, close ) {
	$scope.issue = issue;

	$scope.close = function( result ) {
		close();
		$( 'body' ).removeClass( "modal-open" );
		$( '.modal-backdrop.in' ).remove();
	};

	$scope.inputDetails = function() {
		ModalService.showModal( {
			templateUrl: "components/modals/upload-details.html",
			controller: "modalController",
			inputs: {
				issue: null
			}
		} ).then( function( modal ) {
			modal.element.modal();
			modal.close.then( function( result ) {
				console.log( result.title );
			});
		});
	}

	$scope.inputCreditCard = function() {
		ModalService.showModal( {
			templateUrl: "components/modals/card-details.html",
			controller: "modalController",
			inputs: {
				issue: null
			}
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
			controller: "modalController",
			inputs: {
				issue: null
			}
		} ).then( function( modal ) {
			modal.element.modal();
			modal.close.then( function( result ) {
				console.log( result );
			});
		});
	}

	$scope.uploadIssue = function() {
		var comicData = {
			seriesTitle: $scope.seriesTitle,
			issueNumber: parseInt($scope.issueNumber),
			author: $scope.author,
			description: $scope.desc,
			cover: "images/batman-cover.jpg",
			pages: null
		};
		console.log(comicData);
		$http({
			url: 'http://104.236.52.101/uploadComics',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
		});
	};
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
			controller: "modalController",
			inputs: {
					issue: null
			}
		} ).then( function( modal ) {
			modal.element.modal();
			modal.close.then( function( result ) {
				console.log( result );
			});
		});
	}

	$scope.parseComicElement = function( comicElement ) {
		var comic_cover = comicElement.getElementsByClassName( "data__cover" )[ 0 ].src
		var comic_title = comicElement.getElementsByClassName( "data__title" )[ 0 ].innerHTML;
		var comic_seriesTitle = comicElement.getElementsByClassName( "data__series-title" )[ 0 ].innerHTML;
		var comic_issueNumber = comicElement.getElementsByClassName( "data__issue-number" )[ 0 ].innerHTML;
		var comic_author = comicElement.getElementsByClassName( "data__author" )[ 0 ].innerHTML;
		var comic_desc = comicElement.getElementsByClassName( "data__desc" )[ 0 ].innerHTML
		var comic_price = comicElement.getElementsByClassName( "data__price" )[ 0 ].innerHTML
		issue = {
			cover: comic_cover,
			title: comic_title,
			seriesTitle: comic_seriesTitle,
			issueNumber: comic_issueNumber,
			author: comic_author,
			desc: comic_desc,
			price: comic_price
		}
		return issue;
	}
})
