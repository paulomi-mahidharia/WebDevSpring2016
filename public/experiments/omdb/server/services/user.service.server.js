/**
 * Created by paulomimahidharia on 3/15/16.
 */
module.exports = function(app, model){
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req,res){
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.jason(user);
    }

    function updateUser(req,res){
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.jason(user);
    }
}