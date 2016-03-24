/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {


        var vm = this;

        function init() {
            vm.user = {};

            vm.user.username = $rootScope.currentUser.username;
            vm.user.password = $rootScope.currentUser.password;
            vm.user.email = $rootScope.currentUser.email;
            vm.user.firstName = $rootScope.currentUser.firstName;
            vm.user.lastName = $rootScope.currentUser.lastName;

        }

        init();

        vm.update = update;


        function update(user) {
            var updatedContent = {
                _id: $rootScope.currentUser._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email

            };

            UserService.updateUser($rootScope.currentUser._id, updatedContent)
                .then(function (user){
                    $rootScope.currentUser = user.config.data;
                });
        }
    }
})();