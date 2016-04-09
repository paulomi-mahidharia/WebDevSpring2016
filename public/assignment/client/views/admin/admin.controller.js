/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService){
        var vm = this;

        vm.addUser = addUser;
        vm.deleteUser = deleteUser;

        (function init() {

            UserService.findAllUsers()
                .then(
                    function(allUsers){
                        console.log(allUsers);
                        vm.users = allUsers.data;
                    }
                );

        })();

        function addUser(user){

            var newUsers = [];
            UserService.createUser(user)
                .then(
                    function(response){

                        var users = response.data;

                        // Display users except Admin

                        for(var i in users){
                            if(users[i].roles.indexOf("admin") == -1){
                                newUsers.push(users[i]);
                            }
                        }

                        vm.users = newUsers;
                    }
                );
            vm.user = {};
        }

        function deleteUser($index){

            var userId = vm.users[$index]._id;

            UserService.deleteUserById(userId)
                .then(
                    function(users){
                        vm.users = users.data;

                    }
                );
        }


    }
})();
