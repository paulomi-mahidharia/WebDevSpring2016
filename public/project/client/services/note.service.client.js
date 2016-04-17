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
            updateNoteById: updateNoteById,
            createNoteForUser: createNoteForUser,
            findNoteById: findNoteById,
            removeLikedUser: removeLikedUser,
            sortWidgets: sortWidgets,

            //Notebook services
            deleteNotebookById: deleteNotebookById,
            selectNoteBookById: selectNoteBookById,
            updateNoteBookById: updateNoteBookById,
            addNoteBookForUser: addNoteBookForUser,
            findAllNoteBooksForUser: findAllNoteBooksForUser

        };

        return api;


        function removeLikedUser(userId, noteId){

            return $http.delete("/api/project/note/"+noteId+"/user/"+userId);
        }

        function userLikesNote(userId, note){
            return $http.post("/api/project/user/"+userId+"/note/"+note._id, note);
        }

        function findAllNotesLikedByUser(userId){
            return $http.get("/api/project/user/"+userId+"/note/liked");
        }

        function deleteNoteById(noteId) {
           //console.log(noteId);
           return $http.delete("/api/project/note/"+noteId);
        }

        function findAllNotesForUser(userId){
            return $http.get("/api/project/user/"+userId+"/note");
        }

        function findNoteById(noteId){
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
            //console.log("gcdng");
            return $http.post("/api/project/user/"+userId+"/note", newNote);
        }

        function sortWidgets(noteId, startIndex, endIndex) {

            return $http.put("/api/project/note/"+noteId+"/widget?startIndex="+startIndex+"&endIndex="+endIndex);
        }



        ////////////////////////////////////////////////////////////////////
        function deleteNotebookById(NBId){
            console.log(NBId);
            return $http.delete("/api/project/notebook/"+NBId);

        }

        function selectNoteBookById(NBId){
            return $http.get("/api/project/notebook/"+NBId);
        }

        function updateNoteBookById(NBId, newNB){
            return $http.put("/api/project/notebook/"+NBId, newNB);

        }

        function addNoteBookForUser(userId,newNB){
            return $http.post("/api/project/user/"+userId+"/notebook/", newNB);
        }

    }
})();