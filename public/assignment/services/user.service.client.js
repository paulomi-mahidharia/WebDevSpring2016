/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    var users =  [
        {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
            "username":"alice",  "password":"alice",   "roles": ["student"]		},
        {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
            "username":"bob",    "password":"bob",     "roles": ["admin"]		},
        {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
            "username":"charlie","password":"charlie", "roles": ["faculty"]		},
        {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
        {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
            "username":"ed",     "password":"ed",      "roles": ["student"]		}
    ];

    function UserService(){
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }

        return api;

        function findUserByUsernameAndPassword(username, password, callback){
            var matchingUser = null;
            for (var i=0; i<users.length; i++){
                if(users[i].username === username && users[i].password === password){
                    matchingUser = {
                        _id: users[i]._id,
                        firstName: users[i].firstName,
                        lastName: users[i].lastName,
                        username: users[i].username,
                        password: users[i].password,
                        roles: users[i].roles,
                        email: users[i].email
                    }
                    break;
                }
            }
        callback(matchingUser);
        }

        function findAllUsers(callback){
            callback(users);
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
            users.push(newUser);
            callback(newUser);
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
