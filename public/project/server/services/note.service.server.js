/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
module.exports = function(app, NoteModel, NotebookModel) {
    //app.post("/api/project/user/:userId/movie/:noteId", userLikesNote);

    //Note api calls
    app.get("/api/project/user/:userId/note/liked", findAllNotesLikedByUser);
    app.delete("/api/project/note/:noteId", deleteNoteById);
    app.get("/api/project/user/:userId/note", findAllNotesForUser);
    app.get("/api/project/note/:noteId", selectNoteById);
    app.put("/api/project/note/:noteId", updateNoteById);

    //Notebook api calls
    app.get("/api/project/user/:userId/notebook", findAllNoteBooksForUser);

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
        res.json(NoteModel.findAllNotesForUser(userId));
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
};