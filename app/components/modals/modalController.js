comicableApp.controller( 'modalController', function( $scope, ModalService, close ) {

  $scope.close = function( result ) {
    close(result, 500);
  };

  $scope.inputDetails = function() {
      ModalService.showModal( {
          templateUrl: "components/modals/uploadDetails.html",
          controller: "modalController"
      } ).then( function( modal ) {
          modal.element.modal();
          modal.close.then( function( result ) {
              console.log( result );
          });
      });
  }

});
