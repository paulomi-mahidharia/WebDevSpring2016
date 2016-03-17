/**
 * Created by paulomimahidharia on 3/16/16.
 */

var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    }
    return api;

    function findUserByCredentials(credentials){
        for(var user in users){
            if(users[user].username == credentials.username && users[user].password == credentials.password){
                var foundUser = users[user];
                break;
            }
        }
        return foundUser;
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
}