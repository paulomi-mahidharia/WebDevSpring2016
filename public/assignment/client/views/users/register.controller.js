/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){

        var vm = this;
        vm.register = register;

        function register(user){
            var currentUser = {
                    _id: (new Date).getTime(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    roles: user.roles,
                    email: user.email
                };

            UserService.createUser(currentUser)
                .then(function (newUser){
                    UserService.setCurrentUser(newUser.config.data);
                    $location.url("/profile/");
                    });
        }
    }
})();