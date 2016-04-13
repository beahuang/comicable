comicableApp.controller( 'currentlyReadingController', function( $scope, $http ) {
    $scope.message = 'Currently Reading'

    $http({
        method: 'GET',
        url: 'http://104.236.52.101/currentlyReading'
    }).then(function successCallback(response) {
        $scope.currentlyReading = response.data;
    });

    $scope.addToList = function() {
        $http({
            method: 'GET',
            url: 'http://104.236.52.101/uploaded'
        }).then(function successCallback(response) {
            $scope.uploaded = response.data;
        });
        console.log( $scope.uploaded );

        var id = null;

		var comicData = {
			currentlyReading: 1,
			comicId: id
		};

        $http({
            url: 'http://104.236.52.101/setCurrentlyReading',
            method: 'POST',
            data: comicData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
        }).success(function (data, status) {
            $http({
                method: 'GET',
                url: 'http://104.236.52.101/currentlyReading'
            }).then(function successCallback(response) {
                $scope.currentlyReading = response.data;
            });
        });
    };
})
