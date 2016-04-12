/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
module.exports = function(app, NoteModel, NotebookModel, UserModel, uuid) {
    //app.post("/api/project/user/:userId/movie/:noteId", userLikesNote);

    //Note api calls
    app.get("/api/project/user/:userId/note/liked", findAllNotesLikedByUser);
    app.delete("/api/project/note/:noteId", deleteNoteById);
    app.get("/api/project/user/:userId/note", findAllNotesForUser);
    app.get("/api/project/note/:noteId", findNoteById);
    app.put("/api/project/note/:noteId", updateNoteById);
    app.post("/api/project/user/:userId/note", createNoteForUser);
    app.post("/api/project/user/:userId/note/:noteId", userLikesNote);
    app.delete("/api/project/user/:userId/note/:noteId", removeLikedNote);

    //Notebook api calls
    app.get("/api/project/user/:userId/notebook", findAllNoteBooksForUser);
    app.delete("/api/project/notebook/:NBId", deleteNotebookById);
    app.get("/api/project/notebook/:NBId", selectNoteBookById);
    app.put("/api/project/notebook/:NBId", updateNoteBookById);
    app.post("/api/project/user/:userId/notebook", addNoteBookForUser);

    //Note functions

    function removeLikedNote(req, res) {
        var note  = req.body;
        var userId = req.params.userId;
        //console.log(userId);
        var noteId = req.params.noteId;
        var newNote;

        /*NoteModel
            .removeLikedNote(userId, note)
            // add user to note likes
            .then(
                function (note) {
                    var notes = NoteModel.find();
                    //console.log(notes);
                    return UserModel.removeLikedNote(userId, note, notes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );*/

        NoteModel.removeLikedNote(userId, noteId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function userLikesNote(req, res) {
        var note  = req.body;
        var userId = req.params.userId;
        var noteId = req.params.noteId;
        var newNote;

        NoteModel
            .userLikesNote(userId, note)
            // add user to note likes
            .then(
                function (note) {
                    return UserModel.userLikesNote(userId, note);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findAllNotesLikedByUser(req, res){
        var userId = req.params.userId;
        res.json(NoteModel.findAllNotesLikedByUser(userId));


        //var user = null;

        /*UserModel.findUserById(userId)
            .then(function(doc){
                user = doc;
                //console.log(user);
                if(user){

                }
            })*/


    }

    function deleteNoteById(req, res){
        var noteId = req.params.noteId;

        NoteModel.deleteNoteById(noteId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function findAllNotesForUser(req, res){
        var userId = req.params.userId;

        NoteModel.findAllNotesForUser(userId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function findNoteById(req, res){
        var noteId = req.params.noteId;
        //res.send(NoteModel.selectNoteById(noteId));
        NoteModel.findNoteById(noteId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function findAllNoteBooksForUser(req, res){
        var userId = req.params.userId;
        res.json(NotebookModel.findAllNoteBooksForUser(userId));
    }

    function updateNoteById(req, res){
        var noteId = req.params.noteId;
        var newNote = req.body;
        //res.json(NoteModel.updateNoteById(noteId, newNote));

        NoteModel.updateNoteById(noteId, newNote)
            .then(
                function (doc) {
                    //console.log(doc);
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function createNoteForUser(req, res){

        var note = req.body;
        var userId = req.params.userId;

        note.createdBy = userId;
        note.created = Date.now();

         NoteModel.createNote(note)
            .then(
                function (doc) {
                    //console.log(doc);
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    //Notebook functions

    function deleteNotebookById(req, res){
        var NBId = req.params.NBId;
        //console.log("In server");
        //console.log(noteId);
        res.send(NotebookModel.deleteNotebookById(NBId));
        //res.send(200);
    }

    function selectNoteBookById(req, res){
        var NBId = req.params.NBId;
        res.send(NotebookModel.selectNoteBookById(NBId));
    }

    function updateNoteBookById(req, res){
        //console.log("reached server side");
        var NBId = req.params.NBId;
        //console.log(NBId);
        var newNB = req.body;
        //console.log(newNB);
        res.json(NotebookModel.updateNoteBookById(NBId, newNB));
    }

    function  addNoteBookForUser(req, res){
        var userId = req.params.userId;
        var newNB = req.body;
        //console.log("server side add");
        //console.log(userId);
        //console.log(newNB);
        res.json(NotebookModel.addNoteBookForUser(userId, newNB));
    }
};