comicableApp.controller( 'currentlyReadingController', function( $scope, $http ) {
    $scope.message = 'Currently Reading'

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/currentlyReading'
    }).then(function successCallback(response) {
        $scope.currentlyReading = response.data;
    });
})
