/**
 * Created by paulomimahidharia on 3/16/16.
 */
module.exports = function(app, UserModel, NoteModel, uuid){

    //responds with an array of all users
    app.get("/api/project/user", findAllUsers);

    //Return logged in user (possibly null)
    app.get("/api/project/user/loggedin", loggedIn);

    //updates an existing user whose id property is equal to the id path parameter.
    //The new properties are set to the values in the user object embedded in the HTTP request. Responds with an array of all users
    app.put("/api/project/user/:id", updateUser);

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/project/user", createUser);

    //removes an existing user whose id property is equal to the id path parameter.
    // Responds with an array of all users
    app.delete("/api/project/user/:id", deleteUserById);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/project/user/:UserId", findUserById);

    //Logout current user
    app.post("/api/project/user/logout", logout);

    //Find notes liked by user
    app.get("/api/project/user/:userId/notes", findNoteLikes);

    app.delete("/api/project/user/:userId/note/:noteId", removeLikedNote);

    function removeLikedNote(req, res){
        var userId = req.params.userId;
        var noteId = req.params.noteId;

        UserModel.removeLikedNote(userId, noteId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findNoteLikes(req, res){
        var userId = req.params.userId;

        var user;

        UserModel.findUserById(userId)
            .then (
                function (doc) {
                    user = doc;
                    if (doc) {
                        return NoteModel.findNotesByIds(user.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (notes) {
                    user.likesNotes = notes;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
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

        else{

            var user = UserModel.findAllUsers()
                .then(
                    function (doc) {

                        res.json(doc);
                    },

                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
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

        res.json(req.session.currentUser);
    }

    function logout(req, res) {

        req.session.destroy();
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
        var user = req.body;

        var updatedUser = UserModel.updateUser(userId, user)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                });
    }

    function createUser(req,res){
        var user = req.body;

        user = UserModel.createUser(user)
            // handle model promise
            .then(

                // login user if promise resolved
                function ( doc ) {

                    req.session.currentUser = doc;
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res){

        var user = req.body;
        var userId = req.params.id;

        user = UserModel.deleteUserById(userId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);

                }
            );
    }
};