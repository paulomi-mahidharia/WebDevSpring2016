(function(){
    angular
        .module("NoteSpace")
        .controller("SearchController", searchController);

    function searchController($scope, MapService){
        $scope.search = search;

        if($scope.place){
            conlose.log($scope.place);
            search($scope.place);
        }

        function search(place){
            //$location.url("/"+$scope.formatted_address);
            MapService.findPlaceByName(place, function(response){
                console.log(response);
                $scope.data = response;
            })
        }

    }
})();
