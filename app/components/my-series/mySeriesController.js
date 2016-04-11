comicableApp.controller( 'mySeriesController', function( $scope, ModalService, $http ) {
    $scope.message = 'Your Collection';

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/uploaded'
    }).then(function successCallback(response) {
        $scope.mySeries = response.data;
    });

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
            templateUrl: "components/modals/series-details.html",
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
        $scope.changeHeartClass();
    }

    $scope.showDropdown = function() {
        //TODO Show/hide dropdown party
    }

    $scope.uploadIssue = function() {
        var comicData = {
        };
        $http({
            url: '',
            method: 'POST',
            data: comicData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
        }).success(function (data, status) {
            // Reset $scope.comic_series
            $http({
                method: 'GET',
                url: '/someUrl'
            }).then(function successCallback(response) {
                for (var i = 0;  i < response.issue.length; i++) {
                    //unpack data
                }
                $scope.mySeries = response.mySeries;
            });
        });
    };
})
