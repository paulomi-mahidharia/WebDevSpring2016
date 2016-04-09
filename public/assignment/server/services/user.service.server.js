/**
 * Created by paulomimahidharia on 3/16/16.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, UserModel, uuid){

    var auth = authorized;
    app.post  ('/api/assignment/login', passport.authenticate('local'), login);

    //responds with an array of all users
    app.get("/api/assignment/user",auth, findAllUsers);

    //Return logged in user (possibly null)
    app.get("/api/assignment/user/loggedin", loggedIn);

    //updates an existing user whose id property is equal to the id path parameter.
    //The new properties are set to the values in the user object embedded in the HTTP request. Responds with an array of all users
    app.put("/api/assignment/user/:id",auth, updateUser);

    //registers a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/register", register);

    //admin creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user", createUser);

    //removes an existing user whose id property is equal to the id path parameter.
    // Responds with an array of all users
    app.delete("/api/assignment/user/:id",auth, deleteUserById);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:UserId", findUserById);

    //Logout current user
    app.post("/api/assignment/user/logout", logout);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function localStrategy(username, password, done) {
        UserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                        } else {
                        return done(null, false);
                        }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function findAllUsers(req, res){

        var username = req.query.username;
        var password = req.query.password;

        // If both username and password are provided for credentials

        if(username != null && password!= null) {

            var credentials = {username: username, password: password};
            findUserByCredentials(credentials, req, res);
        }

        //If only username is provided for credentials

        else if(username != null){

            findUserByUsername(username, req, res)
        }

        //If nothing is provided and we need all users

        else {

            if (isAdmin(req.user)) {
                var users =[];

                var user = UserModel.findAllUsers()
                    .then(
                        function (doc) {

                            for(var i in doc){
                                if(doc[i].roles.indexOf("admin") == -1){
                                    users.push(doc[i]);
                                }
                            }

                            res.json(users);
                        },

                        // send error if promise rejected
                        function (err) {
                            res.status(400).send(err);
                        }
                    );
            }
        }
    }

    function findUserByCredentials(credentials, req ,res){

        var user = UserModel.findUserByCredentials(credentials)
            .then(
                function (doc) {

                    req.session.currentUser = doc;
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedIn(req, res) {

        //res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {

        //req.session.destroy();
        //res.send(200);

        req.logOut();
        res.send(200);
    }

    function findUserByUsername(req, res){
        var username = req.body;

        var user = UserModel.findUserByUsername(username)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
            });
    }

    function findUserById(req, res) {

        var userId = req.params.UserId;

        var user = UserModel.findUserById(userId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                });

    }

    function updateUser(req,res){
        var userId = req.params.id;
        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        UserModel
            .updateUser(userId, newUser)
            .then(
                function(user){
                    return UserModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function register(req,res){
        var newUser = req.body;
        newUser.roles = ['student'];

        UserModel.findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return UserModel.register(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return UserModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return UserModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return UserModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function deleteUserById(req, res){

        //var user = req.body;
        var userId = req.params.id;

        if(isAdmin(req.user)) {

            UserModel
                .deleteUserById(userId)
                .then(
                    function(user){
                        return UserModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};