/**
 * Created by paulomimahidharia on 3/4/16.
 */
    'use strict';
(function(){
    angular
    .module("NoteSpace")
        .controller("MapController", MapController);

        function MapController($scope, $sce) {

                    $scope.data = {
                        url: $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y&q=" + $scope.address + "&zoom=16")
                    }

        }
    module.exports = MapCtrl
})();