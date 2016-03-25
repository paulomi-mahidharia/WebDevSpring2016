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
        $scope.user.username = $rootScope.currentUser.username;
        $scope.user.password = $rootScope.currentUser.password;
        $scope.user.firstName = $rootScope.currentUser.firstName;
        $scope.user.lastName = $rootScope.currentUser.lastName;
        $scope.user.email = $rootScope.currentUser.email;

        $scope.update = update;

        function update(user) {
            UserService.updateUser(
                $rootScope.currentUser._id,
                user,
                updateProfile);

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