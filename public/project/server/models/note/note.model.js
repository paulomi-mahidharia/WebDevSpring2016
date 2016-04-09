/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";

var notes = require("./note.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    var NoteSchema = require("./note.schema.server.js")(mongoose);
    var Note = mongoose.model('Note', NoteSchema);

    var api = {
        findAllNotesLikedByUser: findAllNotesLikedByUser,
        deleteNoteById: deleteNoteById,
        findAllNotesForUser: findAllNotesForUser,
        selectNoteById: selectNoteById,
        updateNoteById: updateNoteById,
        createNote: createNote
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
        /*var userNotes = [];
        for(var i in notes){
            var noteObj = notes[i];
            //console.log(noteObj.createdBy);
            if(noteObj.createdBy == userId){
                userNotes.push(noteObj);
            }
        }
        //console.log(userNotes);
        return userNotes;*/

        return Note.find();
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
            if (notes[noteObj].id == noteId) {
                notes[noteObj] = newNote;
                console.log(notes[noteObj]);
                return notes[noteObj];
            }
        }
    }

    function createNote(newNote){


        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        Note.create(newNote, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log(doc);
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;

        /*var note = Note.create(newNote);
        console.log(note);
        return note;*/
    }

};
