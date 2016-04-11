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

        deleteNoteById: deleteNoteById,
        findAllNotesForUser: findAllNotesForUser,
        findNoteById: findNoteById,
        updateNoteById: updateNoteById,
        createNote: createNote,
        userLikesNote: userLikesNote,
        findNotesByIds: findNotesByIds
    };

    return api;

    function userLikesNote(userId, note){
        var deferred = q.defer();

        // find the note by noteId
        Note.findOne({_id: note._id},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a note
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findNotesByIds(noteIds){

        var deferred = q.defer();

        // find all users in array of user IDs
        Note.find({
            _id: {$in: noteIds}
        }, function (err, notes) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(notes);
            }
        });

        return deferred.promise;
    }

    function deleteNoteById(noteId){

        return Note.findByIdAndRemove(noteId);
    }

    function findAllNotesForUser(userId){

        return Note.find();
    }

    function findNoteById(noteId){

        return Note.findById(noteId);
    }

    function updateNoteById(noteId, newNote){

        return Note.findByIdAndUpdate(noteId, newNote);
    }

    function createNote(newNote){

        return Note.create(newNote);

    }

};
