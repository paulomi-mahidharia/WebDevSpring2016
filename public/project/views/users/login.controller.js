/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService){
        $scope.login = login;

        function login(user){
            UserService.findUserByUsernameAndPassword(user.username, user.password, findAuthenticUser);

            function findAuthenticUser(user){
                console.log(user);
                if(user){
                    $rootScope.newUser = user;
                    $location.url("/profile");
                }
            }
        }
    }
})();