/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            console.log("in logout");
            UserService.setCurrentUser(null);
            console.log(UserService.getCurrentUser());
            $location.url("/home");
        }
    }
})();