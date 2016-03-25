(function(){
    angular
        .module("NoteSpace")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, MapService) {
        $scope.place_id = $routeParams.place_id;

        MapService.findPlaceById($scope.place_id, function (response) {
            console.log("In details page");
            console.log(response);
                $scope.address = response;
            })
    }

})();
