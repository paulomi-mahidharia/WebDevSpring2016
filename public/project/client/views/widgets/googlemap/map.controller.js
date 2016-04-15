/**
 * Created by paulomimahidharia on 3/9/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("MapController", MapController);

    function MapController($scope, MapService, WidgetService, $routeParams, $location){

        var vm = this;

        $scope.search = search;
        vm.addMap = addMap;

        var searchedLocation;

        var lat;
        var lng;
        var noteId = $routeParams.noteId;
        var placeId;


        var input = document.getElementById('Autocomplete');


        var autocompleteOrigin = new google.maps.places.Autocomplete(input);

        function search(){

            searchedLocation = document.getElementById('Autocomplete').value;
            //console.log(searchedLocation);

            MapService.findPlaceByName(searchedLocation, function(response){
                //console.log(response);
                $scope.data = response.results;


                lat = response.results[0].geometry.location.lat;
                lng = response.results[0].geometry.location.lng;
                placeId = response.results[0].place_id;

                console.log(placeId);

                //console.log(lat);
                //console.log(lng);

                var myLatLng = {lat: response.results[0].geometry.location.lat,
                    lng: response.results[0].geometry.location.lng};

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng
                });

                //console.log(map);
                //console.log(myLatLng);

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

            if(lat && lng && searchedLocation){

                console.log("in map");

                var widget = {
                    widgetType : "MAP",
                    map : {
                        lat : lat,
                        lng : lng,
                        location : searchedLocation,
                        placeId : placeId
                    }
                };

                console.log(widget);


                WidgetService.addWidget(noteId, widget)
                    .then(
                        function (response) {
                            console.log(response);
                            $location.url("/editnote/"+noteId);
                        }
                    );
            }
        }

    }
})();