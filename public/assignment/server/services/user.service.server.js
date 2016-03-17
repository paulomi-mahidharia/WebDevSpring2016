/**
 * Created by paulomimahidharia on 3/16/16.
 */
module.exports = function(app, UserModel){
    app.get("/api/assignment/user", findAllUsers);

    function findAllUsers(req, res){

        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        if(username != null && password!= null) {
            UserModel.findUserByCredentials(credentials)
                .then(function (user) {
                    res.json(user);
                });
        }
        else if(username != null){
            UserModel.findUserByUsername(username)
                .then(function (user){
                    res.json(user);
                });
        }
        else{
            UserModel.findAllUsers()
                .then(function(users){
                    res.json(users);
                });
        }
    }

    function findUserByCredentials(req,res){
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function findUserByUsername(req, res){
        var username = req.body;
        var user = model.findUserByUsername(username);
        res.json(user);
    }
}