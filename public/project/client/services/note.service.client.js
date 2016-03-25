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
            userLikesNote: userLikesNote,
            findAllNotesForUser: findAllNotesForUser,
            deleteNoteById: deleteNoteById
        }

        return api;

        function userLikesNote(userId, note){
            return $http.post("/api/project/user/"+userId+"/note/"+note.id, note);
        }

        function findAllNotesForUser(userId){
            return $http.get("/api/project/user/"+userId+"/note");
        }

        function deleteNoteById(noteId) {
           // console.log(noteId);
           return $http.delete("/api/project/note/"+noteId);
        }

    }
})();