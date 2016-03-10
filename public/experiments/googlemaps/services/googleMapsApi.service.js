/**
 * Created by paulomimahidharia on 3/1/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("MapService", mapService);

    function mapService($http){
        var api = {
            findPlaceByName: findPlaceByName,
            findPlaceById: findPlaceById
        };

        return api;

        function findPlaceByName(place, callback){
            console.log(place);
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y")
                .success(callback);
        }

        function findPlaceById(place_id, callback){
            console.log(place_id);
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?place_id="+place_id+"&key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y")
                .success(callback);
        }
    }
})();