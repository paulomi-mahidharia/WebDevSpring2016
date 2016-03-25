/**
 * Created by paulomimahidharia on 3/16/16.
 */

var users = require("./user.mock.json");

var noUser = {};

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        findUserById: findUserById,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    }
    return api;

    function findUserByCredentials(credentials){
        for(var user in users){
            if(users[user].username == credentials.username && users[user].password == credentials.password){
                var foundUser = users[user];
                return foundUser;
                break;
            }
        }
        return noUser;
    }

    function findUserByUsername(username){
        for(var user in users){
            if(users[user].username == username){
                var foundUser = users[user];
                break;
            }
        }
        return foundUser;
    }

    function findAllUsers(){
        return users;
    }

    function updateUser(userId, user){

         for(var value in users){
             var obj = users[value];
             var id = obj._id;
             if(id === userId){
                 users[value] = user;
                 return users[value];
             }
         }
         return null;
    }

    function findUserById(UserId){
        for(var value in users){
            var obj = users[value];
            var id = obj._id;
            if(id === UserId){
                return users[value];
            }
        }
        return null;
    }

    function createUser(user){
         users.push(user);
         return user;
    }

    function deleteUserById(UserId){
        var userIndex = -1;
        for (var user in users){
            if(user._id === UserId) {
                userIndex = users.indexOf(user);
                break;
            }
        }
        if(userIndex >= 0){
            users.splice(userIndex, 1);
        }
        return users;
    }

}