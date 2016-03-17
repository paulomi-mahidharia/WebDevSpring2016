/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);



    function UserService($http){
        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }

        return api;

        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function findUserByUsername(username){
            return $http.get("/api/assignemnt/user?username="+username);
        }

        function createUser(user, callback){
            var newUser = {
                _id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email
            };
            users.push(currentUser);
            callback(currentUser);
        }

        function deleteUserById(userId, callback){
            var userIndex = -1;
            for (var user in users){
                if(user._id === userId) {
                    userIndex = users.indexOf(user);
                    break;
                }
            }
            if(userIndex >= 0){
                users.splice(userIndex, 1);
            }
            callback(users);
        }

        function updateUser(userId, user, callback){
            var updatedUserIndex = -1;
            for(var i = 0; i<users.length; i++){
                if(users[i]._id === userId){
                    updatedUserIndex = i;
                    break;
                }
            }
            if(updatedUserIndex != -1) {
                users[updatedUserIndex].firstName = user.firstName;
                users[updatedUserIndex].lastName = user.lastName;
                users[updatedUserIndex].username = user.username;
                users[updatedUserIndex].password = user.password;
                users[updatedUserIndex].roles = user.roles;
                users[updatedUserIndex].email = user.email;
            }
            callback(users[updatedUserIndex]);
        }

    }
})();
