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

        function register(user) {
            if (user) {
                var newUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    roles: user.roles,
                    email: [user.email],
                    phones: []
                };

                UserService.createUser(newUser)
                    .then(function (newUser) {
                        var currentUser = newUser.config.data;
                        console.log(currentUser);
                        if(currentUser!=null){
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile/");
                        }
                    });
            }
            else {
                alert("Please fill the required fields!");
            }
        }
    }
})();