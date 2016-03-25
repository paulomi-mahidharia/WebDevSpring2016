/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
module.exports = function(app, NoteModel) {
    //app.post("/api/project/user/:userId/movie/:noteId", userLikesNote);
    app.get("/api/project/user/:userId/note", findAllNotesForUser);
    app.delete("/api/project/note/:noteId", deleteNoteById);

    function findAllNotesForUser(req, res){
        var userId = req.params.userId;
        res.json(NoteModel.findAllNotesForUser(userId));
    }

    function deleteNoteById(req, res){
        var noteId = req.params.noteId;
        //console.log("In server");
        //console.log(noteId);
        res.send(NoteModel.deleteNoteById(noteId));
        //res.send(200);
    }


    /*function userLikesNote(req, res) {
        var likedNote  = req.body;
        var userId = req.params.userId;
        var noteId = req.params.noteId;
        var movie;

        noteModel
            .userLikesNote(userId, likedNote)
            // add user to note likes
            .then(
                function (note) {
                    return userModel.userLikesNote(userId, note);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add note to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }*/
}