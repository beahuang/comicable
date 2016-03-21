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
})
