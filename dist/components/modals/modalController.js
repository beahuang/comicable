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
			coverImage: "images/batman-cover.jpg",
			pages: null
		};
		console.log(comicData);
		$http({
			url: 'http://104.236.52.101/uploadComics',
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
		});
	};
});
