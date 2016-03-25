/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService){
        $scope.register = register;

        function register(user){

            UserService.createUser(
                user,
                function(newUser){
                    $rootScope.currentUser = currentUser;
                    $location.url("/profile/");
                });



        }
    }
})();