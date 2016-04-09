/**
 * Created by paulomimahidharia on 3/16/16.
 */

var users = require("./user.mock.json");
var q = require("q");

var noUser = {};

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model('ProjectUser', UserSchema);

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

        var deferred = q.defer();

        User.findOne({username: username}, function (err,doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers(){

        return users;
    }

    function updateUser(userId, user){

        var deferred = q.defer();

        User.findByIdAndUpdate(userId, user, function (err,doc){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserById(UserId){

        var deferred = q.defer();

        User.findById(UserId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createUser(user){

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

        var deferred = q.defer();

        User.findByIdAndRemove(UserId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

};