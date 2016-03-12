/**
 * Created by paulomimahidharia on 3/9/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("MapController", MapController);

    function MapController($scope, MapService, $http){
        $scope.search = search;


        var input = document.getElementById('Autocomplete');


        var autocompleteOrigin = new google.maps.places.Autocomplete(input);

        //search();
        //$scope.details = details;

       /* if($scope.place){
            conlose.log($scope.place);
            search($scope.place);
        }*/



        function search(){
            MapService.findPlaceByName(document.getElementById('Autocomplete').value, function(response){
                console.log(response);
                $scope.data = response;

                var myLatLng = {lat: response.results[0].geometry.location.lat,
                    lng: response.results[0].geometry.location.lng};

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: myLatLng
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: 'Hello World!'
                });
            })
        }

    }
})();