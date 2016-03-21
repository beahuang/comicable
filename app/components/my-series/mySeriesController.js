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

    $scope.showDetails = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/show-details.html",
            controller: "modalController"
        } ).then( function( modal ) {
            modal.element.modal();
            modal.close.then( function( result ) {
                console.log( result );
            });
        });
    }

    $scope.addToFavorites = function() {
        ModalService.showModal( {
            templateUrl: "components/modals/confirm.html",
            controller: "modalController"
        } ).then( function( modal ) {
            modal.element.modal();
            modal.close.then( function( result ) {
                $scope.changeHeartClass();
            });
        });
    }

    $scope.class = "";
    $scope.changeHeartClass = function() {
        if ($scope.class === "") {
            $scope.class = "favorited";
        } else {
            $scope.class = "";
        }
    }

    $scope.removeFromFavorites = function() {

    }
})
