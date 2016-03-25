/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";

var notes = require("./note.mock.json");

module.exports = function() {
    var api = {
        findAllNotesLikedByUser: findAllNotesLikedByUser,
        deleteNoteById: deleteNoteById,
        findAllNotesForUser: findAllNotesForUser,
        selectNoteById: selectNoteById,
        updateNoteById: updateNoteById
    };

    return api;

    function findAllNotesLikedByUser(userId) {
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
        //console.log(noteId);
        for (var noteObj in notes) {
            if (notes[noteObj].id == noteId) {
                notes.splice(noteObj,1);
                break;
            }
        }
        return notes;
    }

    function findAllNotesForUser(userId){
        var userNotes = [];
        for(var i in notes){
            var noteObj = notes[i];
            //console.log(noteObj.createdBy);
            if(noteObj.createdBy == userId){
                userNotes.push(noteObj);
            }
        }
        //console.log(userNotes);
        return userNotes;
    }

    function selectNoteById(noteId){
        for (var noteObj in notes) {
            if(notes[noteObj].id == noteId) {
                return notes[noteObj];
            }
        }
        return null;
    }

    function updateNoteById(noteId, newNote){
        for (var noteObj in notes) {
            if (notes[noteObj]._id == noteId) {
                notes[noteObj] = newNote;
                return newNote;
            }
        }
    }
};
