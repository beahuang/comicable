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
