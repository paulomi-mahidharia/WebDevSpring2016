/**
 * Created by paulomimahidharia on 3/25/16.
 */
var notebooks = require("./notebook.mock.json");

module.exports = function() {
    var api = {
        findAllNoteBooksForUser: findAllNoteBooksForUser,
        deleteNotebookById: deleteNotebookById,
        selectNoteBookById: selectNoteBookById,
        updateNoteBookById: updateNoteBookById,
        addNoteBookForUser: addNoteBookForUser
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


    function deleteNotebookById(NBId){
        for (var nb in notebooks) {
            if (notebooks[nb]._id == NBId) {
                notebooks.splice(nb,1);
                break;
            }
        }
    }


    function selectNoteBookById(NBId){
        console.log("nbid:"+NBId);
        for (var nb in notebooks) {
            console.log("nb:"+nb);
            if(notebooks[nb]._id == NBId) {
                return notebooks[nb];
            }
        }
        return null;
    }

    function updateNoteBookById(NBId, newNB){
        for (var nb in notebooks) {
            if (notebooks[nb]._id == NBId) {
                notebooks[nb] = newNB;
                return newNB;
            }
        }
    }

    function addNoteBookForUser(userId, newNB){
        notebooks.push(newNB);
    }

};