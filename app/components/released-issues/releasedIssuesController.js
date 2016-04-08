comicableApp.controller( 'releasedIssuesController', function( $scope, ModalService ) {
    $scope.message = 'Week of April 5 - 10'

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
})
