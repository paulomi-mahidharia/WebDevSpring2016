/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();