/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";

var notes = require("./note.mock.json");

module.exports = function() {
    var api = {
        findAllNotesForUser: findAllNotesForUser,
        deleteNoteById: deleteNoteById
    };

    return api;

    function findAllNotesForUser(userId) {
        var userNotes = [];
        for (var i in notes) {
            var noteObj = notes[i];
            for(var j in noteObj.likedBy){
                if(noteObj.likedBy[j] == userId){
                    userNotes.push(noteObj);

                }
            }
        }
        return userNotes;
    }

    function deleteNoteById(noteId){
        console.log(noteId);
        for (var noteObj in notes) {
            if (notes[noteObj].id == noteId) {
                notes.splice(noteObj,1);
                break;
            }
        }
        return notes;
    }
}
