/**
 * Created by paulomimahidharia on 3/16/16.
 */
module.exports = function(app, UserModel){
    app.get("/api/assignment/user", findAllUsers);
    app.put("/api/assignment/user/:id", updateUser);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    //Return logged in user (possibly null)
    //app.get("/api/assignment/user/loggedin", loggedIn);

    //Logout current user
    //app.post("/api/assignment/user/logout", logout);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);

    function findAllUsers(req, res){

        var username = req.query.username;
        var password = req.query.password;



        if(username != null && password!= null) {
            var credentials = {username: username, password: password};
            findUserByCredentials(credentials, req, res);
        }

        else if(username != null){
            findUserByUsername(username, req, res);
            res.json(user);
        }
        else{
            var user = UserModel.findAllUsers();
            res.json(users);

        }
    }

    function findUserByCredentials(credentials, req ,res){

        var user = UserModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    /*function loggedIn(req, res) {

        if(!req.session.currentUser) {
            req.session.currentUser = null;
        }
        res.json(req.session.currentUser);
    }

    function logout(req, res) {

        req.session.destroy();
        res.send(200);
    }*/

    function findUserByUsername(req, res){
        var username = req.body;
        var user = UserModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserById(req, res) {

        var userId = parseInt(req.params.id);
        var user = UserModel.findUserById(userId)

        res.json(user);
    }

    function updateUser(req,res){
        var userId = req.params.id;
        var user = req.body;

        var updatedUser = UserModel.updateUser(userId, user);
        res.json(updatedUser);
    }

    function createUser(req,res){
        var user = req.body;
        var currentUser = UserModel.createUser(user);
        res.json(currentUser);
    }

    function deleteUserById(req, res){
        var usersAfterDeletion = [];
        var userId = req.params.id;
        usersAfterDeletion = UserModel.deleteUserById(userId);
        res.json(usersAfterDeletion);
    }
}