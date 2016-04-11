comicableApp.controller( 'releasedIssuesController', function( $scope, ModalService, $http ) {
    $scope.message = 'New Releases: April 5 - 10'

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/recentlyreleased'
    }).then(function successCallback(response) {
        $scope.recentlyReleased = response.data;
        $scope.featuredIssue = $scope.recentlyReleased[ 0 ];
        $scope.recentlyReleased.shift();
    });

    $scope.showPurchaseDetails = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/purchase-details.html",
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
})
