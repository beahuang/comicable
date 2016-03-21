comicableApp.controller( 'modalController', function( $scope, ModalService, close ) {

  $scope.close = function( result ) {
    close(result, 500);
  };

  $scope.inputDetails = function() {
      ModalService.showModal( {
          templateUrl: "components/modals/upload-details.html",
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
  $scope.confirmPurchase = function() {
      ModalService.showModal( {
          templateUrl: "components/modals/confirm-purchase.html",
          controller: "modalController"
      } ).then( function( modal ) {
          modal.element.modal();
          modal.close.then( function( result ) {
              console.log( result );
          });
      });
  }
});
