/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService){

        var vm = this;

        vm.login = login;

        function login(user){
            UserService.findUserByCredentials(user.username, user.password)
                .then(function(user) {
                    console.log(user);
                    if(user){
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    }
                });
            }
        }
})();