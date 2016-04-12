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
