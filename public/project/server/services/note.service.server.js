/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
module.exports = function(app, NoteModel, NotebookModel, uuid) {
    //app.post("/api/project/user/:userId/movie/:noteId", userLikesNote);

    //Note api calls
    app.get("/api/project/user/:userId/note/liked", findAllNotesLikedByUser);
    app.delete("/api/project/note/:noteId", deleteNoteById);
    app.get("/api/project/user/:userId/note", findAllNotesForUser);
    app.get("/api/project/note/:noteId", selectNoteById);
    app.put("/api/project/note/:noteId", updateNoteById);
    app.post("/api/project/user/:userId/note", createNoteForUser);

    //Notebook api calls
    app.get("/api/project/user/:userId/notebook", findAllNoteBooksForUser);
    app.delete("/api/project/notebook/:NBId", deleteNotebookById);
    app.get("/api/project/notebook/:NBId", selectNoteBookById);
    app.put("/api/project/notebook/:NBId", updateNoteBookById);
    app.post("/api/project/user/:userId/notebook", addNoteBookForUser);

    //Note functions

    function findAllNotesLikedByUser(req, res){
        var userId = req.params.userId;
        res.json(NoteModel.findAllNotesLikedByUser(userId));
    }

    function deleteNoteById(req, res){
        var noteId = req.params.noteId;
        //console.log("In server");
        //console.log(noteId);
        res.send(NoteModel.deleteNoteById(noteId));
        //res.send(200);
    }

    function findAllNotesForUser(req, res){
        var userId = req.params.userId;
        //console.log(userId);
        //res.json(NoteModel.findAllNotesForUser(userId));

        NoteModel.findAllNotesForUser(userId)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function selectNoteById(req, res){
        var noteId = req.params.noteId;
        res.send(NoteModel.selectNoteById(noteId));
    }

    function findAllNoteBooksForUser(req, res){
        var userId = req.params.userId;
        res.json(NotebookModel.findAllNoteBooksForUser(userId));
    }

    function updateNoteById(req, res){
        var noteId = req.params.noteId;
        var newNote = req.body;
        res.json(NoteModel.updateNoteById(noteId, newNote));
    }

    function createNoteForUser(req, res){

        var note = req.body;
        var userId = req.params.userId;

        note.createdBy = userId;
        note.created = Date.now();

         NoteModel.createNote(note)
            .then(
                function (doc) {
                    console.log(doc);
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