/**
 * Created by paulomimahidharia on 3/9/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("MapController", MapController);

    function MapController($scope, MapService){
        $scope.search = search;

        if($scope.place){
            conlose.log($scope.place);
            search($scope.place);
        }

        function search(place){
            MapService.findPlaceByName(place, function(response){
                console.log(response);
                $scope.data = response;
            })
        }

    }
})();