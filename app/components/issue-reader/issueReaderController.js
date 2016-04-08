comicableApp.controller( 'issueReaderController', function( $scope ) {
    $scope.message = 'Issue Reader'

    $scope.imageUrl = 'images/batman-cover.jpg';
    $scope.counter = 0;
    $scope.maxPages = 30;
    $scope.nextImage = function() {
        if ($scope.counter >= $scope.maxPages) {
            $scope.imageUrl = 'images/batman-cover.jpg';
            $scope.counter = 0;
        } else {
            $scope.counter += 1;
            $scope.imageUrl = 'images/batman-' + $scope.counter + '.jpg';
        }
    };

    $scope.prevImage = function() {
        if ($scope.counter <= 1) {
            $scope.imageUrl = 'images/batman-cover.jpg';
        } else {
            $scope.counter -= 1;
            $scope.imageUrl = 'images/batman-' + $scope.counter + '.jpg';
        }
    };
})
