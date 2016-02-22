/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService){
        $scope.user = {};
        $scope.user.username = $rootScope.newUser.username;
        $scope.user.password = $rootScope.newUser.password;
        $scope.user.firstName = $rootScope.newUser.firstName;
        $scope.user.lastName = $rootScope.newUser.lastName;
        $scope.user.email = $rootScope.newUser.email;

        $scope.update = update;

        function update(user) {
            UserService.updateUser(
                $rootScope.newUser._id,
                user,
                updateProfile)

            function updateProfile(updatedUser){

                $scope.user.username = updatedUser.username;
                $scope.user.password = updatedUser.password;
                $scope.user.firstName = updatedUser.firstName;
                $scope.user.lastName = updatedUser.lastName;
                $scope.user.email = updatedUser.email;
            }
        }
    }
})();