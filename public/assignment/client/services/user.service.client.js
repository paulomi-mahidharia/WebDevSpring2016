/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            login: login,
            register: register
        };

        return api;

        function getCurrentUser() {

            return $http.get("/api/assignment/user/loggedin");

        }

        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password){

            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers(){

            return $http.get("/api/assignment/admin/user");
        }

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username="+username);
        }

        function register(user){

            return $http.post("/api/assignment/register",user);
        }

        function createUser(user){

            return $http.post("/api/assignment/admin/user",user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUser(userId, user){

            return $http.put("/api/assignment/admin/user/"+userId, user);
        }
        function findUserById(userId){

            return $http.get("/api/assignment/admin/user/"+userId);
        }

        function login(user) {

            return $http.post("/api/assignment/login", user);
        }

    }
})();
