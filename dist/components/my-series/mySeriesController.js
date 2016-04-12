comicableApp.controller( 'mySeriesController', function( $scope, ModalService, $http ) {
	$scope.message = 'Your Collection';
	$scope.ordering = '';
	$scope.filterFavorites = false;

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
				console.log( result );
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

	$scope.addToFavorites = function() {
		ModalService.showModal( {
			templateUrl: "components/modals/confirm.html",
			controller: "modalController",
			inputs: {
				issue: null
			}
		} ).then( function( modal ) {
			modal.element.modal();
			modal.close.then( function( result ) {
				$scope.changeHeartClass();
			});
		});
	}

	$scope.heartFilled = false;
	$scope.changeHeartClass = function() {
		$scope.heartFilled = !$scope.heartFilled;
	}

	$scope.bookFilled = false;
	$scope.changeBookClass = function() {
		$scope.bookFilled = !$scope.bookFilled;
	}

	$scope.setFavorite = function() {
		var comicData = {
			favorite: null,
			comicId: null
		};
		$http({
			url: 'http://104.236.52.101/favorites',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
			$scope.changeHeartClass()
		});
	};

	$scope.removeFromFavorites = function() {
		var comicData = {
			favorite: null,
			comicId: null
		};
		$http({
			url: 'http://104.236.52.101/favorites',
			method: 'POST',
			data: comicData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
		}).success(function (data, status) {
			$http({
				method: 'GET',
				url: 'http://104.236.52.101/uploaded'
			}).then(function successCallback(response) {
				$scope.mySeries = response.data;
			});
			$scope.changeHeartClass()
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
