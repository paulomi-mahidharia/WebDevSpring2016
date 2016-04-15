/**
 * Created by paulomimahidharia on 3/9/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("MapController", MapController);

    function MapController($scope, MapService, $http){
        $scope.search = search;

        var searchedLocation;


        var input = document.getElementById('Autocomplete');


        var autocompleteOrigin = new google.maps.places.Autocomplete(input);

        function search(){

            searchedLocation = document.getElementById('Autocomplete').value;
            MapService.findPlaceByName(searchedLocation, function(response){
                //console.log(response);
                $scope.data = response.results;

                var myLatLng = {lat: response.results[0].geometry.location.lat,
                    lng: response.results[0].geometry.location.lng};

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng
                });

                console.log(map);
                console.log(myLatLng);

                $scope.map = map;
                $scope.myLatLng = myLatLng;

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: response.results[0].formatted_address
                });
            })
        }

        function addMap(){
            if(searchedLocation){
                var widget = {
                    widgetType : "MAP",
                    map: searchedLocation
                };


                WidgetService.addWidget(noteId, widget)
            }
        }

    }
})();