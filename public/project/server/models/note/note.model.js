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
        findNoteById: findNoteById,
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

        return Note.findByIdAndRemove(noteId);
    }

    function findAllNotesForUser(userId){

        return Note.find();
    }

    function findNoteById(noteId){
        /*for (var noteObj in notes) {
            if(notes[noteObj].id == noteId) {
                return notes[noteObj];
            }
        }
        return null;*/

        return Note.findById(noteId);
    }

    function updateNoteById(noteId, newNote){

        return Note.findByIdAndUpdate(noteId, newNote);
    }

    function createNote(newNote){

        return Note.create(newNote);

    }

};
