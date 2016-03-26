/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("NoteService", NoteService);

    function NoteService($http, $rootScope) {
        var api = {
            //Note services
            userLikesNote: userLikesNote,
            findAllNotesLikedByUser: findAllNotesLikedByUser,
            deleteNoteById: deleteNoteById,
            findAllNotesForUser: findAllNotesForUser,
            selectNoteById: selectNoteById,
            updateNoteById: updateNoteById,
            createNoteForUser: createNoteForUser,

            //Notebook services
            findAllNoteBooksForUser: findAllNoteBooksForUser

        }

        return api;

        function userLikesNote(userId, note){
            return $http.post("/api/project/user/"+userId+"/note/"+note.id, note);
        }

        function findAllNotesLikedByUser(userId){
            return $http.get("/api/project/user/"+userId+"/note/liked");
        }

        function deleteNoteById(noteId) {
           // console.log(noteId);
           return $http.delete("/api/project/note/"+noteId);
        }

        function findAllNotesForUser(userId){
            return $http.get("/api/project/user/"+userId+"/note");
        }

        function selectNoteById(noteId){
            return $http.get("/api/project/note/"+noteId);
        }

        function findAllNoteBooksForUser(userId){
            return $http.get("/api/project/user/"+userId+"/notebook");
        }

        function updateNoteById(noteId, newNote){
            //console.log(newNote);
            return $http.put("/api/project/note/"+noteId, newNote);
        }

        function createNoteForUser(userId, newNote){
            return $http.post("/api/project/user/"+userId+"/note", newNote);
        }

    }
})();