/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService){

        var vm = this;

        vm.login = login;

        function init(){

        }

        function login(user){

            if(!user) {
                return;
            }

            UserService.findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    if(response) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
            }
        }
})();