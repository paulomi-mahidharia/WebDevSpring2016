/**
 * Created by paulomimahidharia on 3/25/16.
 */
var notebooks = require("./notebook.mock.json");

module.exports = function() {
    var api = {
        findAllNoteBooksForUser: findAllNoteBooksForUser
    };

    return api;

    function findAllNoteBooksForUser(userId){
        var userNotebooks = [];
        for(var i in notebooks){
            var notebookObj = notebooks[i];
            //console.log(noteObj.createdBy);
            if(notebookObj.createdBy == userId){
                userNotebooks.push(notebookObj);
            }
        }
        //console.log(userNotes);
        return userNotebooks;
    }
};