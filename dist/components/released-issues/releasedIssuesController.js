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
