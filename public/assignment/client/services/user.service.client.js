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
            getCurrentUser: getCurrentUser
            //logout: logout
        }

        return api;

        function getCurrentUser() {
            //return $http.get("/api/assignment/user/loggedin");
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        /*function logout() {
            return $http.post("/api/assignment/user/logout");
        }*/


        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function findUserByUsername(username){
            return $http.get("/api/assignemnt/user?username="+username);
        }

        function createUser(user){
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user){

            return $http.put("/api/assignment/user/"+userId, user);
        }
        function findUserById(userId){

            return $http.get("/api/assignment/user/"+userId);
        }

    }
})();
