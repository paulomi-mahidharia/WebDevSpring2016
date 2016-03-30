/**
 * Created by paulomimahidharia on 3/16/16.
 */

var users = require("./user.mock.json");
var q = require("q");

var noUser = {};

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        findUserById: findUserById,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials){
        /*for(var user in users){
            if(users[user].username == credentials.username && users[user].password == credentials.password){
                var foundUser = users[user];
                return foundUser;
                break;
            }
        }
        return noUser;*/

        var deferred = q.defer();

        // find one retrieves one document
        User.findOne(

            // first argument is predicate
            {   username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
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
        /*for(var value in users){
            var obj = users[value];
            var id = obj._id;
            if(id === UserId){
                return users[value];
            }
        }
        return null;*/

        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user){
         /*users.push(user);
         return user;*/

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        User.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
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