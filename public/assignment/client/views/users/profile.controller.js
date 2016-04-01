/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {


        var vm = this;

        function init() {
            vm.user = {};

            UserService
                .findUserById($rootScope.currentUser._id)
                .then(function (response) {
                    vm.user = response.data;
                });

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