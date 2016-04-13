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
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        vm.predicate = 'age';
        vm.reverse = true;
        vm.order = function(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };



        function init() {

            var newUsers =[];

            UserService.findAllUsers()
                .then(
                    function(response){

                        var allUsers = response.data;

                        for(var i in allUsers){
                            if(allUsers[i].roles.indexOf("admin") == -1){
                                newUsers.push(allUsers[i]);
                            }
                        }

                        vm.users = newUsers;
                        //$scope.users = vm.users;
                    }
                );

        }
        init();

        function addUser(user){

            var newUsers = [];
            UserService.createUser(user)
                .then(
                    function(response){

                        init();
                    }
                );
            vm.user = {};
        }

        function deleteUser(user){



            UserService.deleteUserById(user._id)
                .then(
                    function(users){

                        init();

                    }
                );
        }

        function selectUser(user){

            //var userId = vm.users[$index]._id;

            UserService.findUserById(user._id)
                .then(
                    function(response){

                        var user = response.data;

                        vm.user = user;
                    }
                );
        }

        function updateUser(user){

            var userId = user._id;

            var newUsers=[];

            UserService.updateUser(userId, user)
                .then(
                    function(response){

                        init();
                        vm.user = {};

                    }
                );
        }

    }
})();
