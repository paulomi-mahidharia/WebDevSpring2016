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

            UserService
                .logout()
                .then(function(user){

                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });

        }
    }
})();