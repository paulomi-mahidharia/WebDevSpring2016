/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("NoteSpace")
        .controller("FavoriteNotesController", FavoriteNotesController);

    function FavoriteNotesController($location, NoteService, $rootScope, UserService) {

        var vm = this;

        vm.deleteFavNote = deleteFavNote;

        function init() {

            UserService.findNoteLikes($rootScope.currentUser._id)

                .then(
                    function(response){

                        vm.notes = response.data.likesNotes;
                    }
                );
        }
        init();

        function deleteFavNote($index){
            var noteId = vm.notes[$index]._id;

            /*NoteService.findNoteById(noteId)
                .then(function(response){
                    if(response) {


                        var note = response.data;
                        //console.log(note);



                        NoteService
                            .removeLikedNote(note.likes.indexOf($rootScope.currentUser._id), note);
                    }
                })*/

            UserService.removeLikedNote($rootScope.currentUser._id, noteId)
                .then(function(response){
                    if(response.data == "OK"){
                        vm.notes.splice($index,1);

                        NoteService.removeLikedNote($rootScope.currentUser._id, noteId)
                            .then(function(response){
                                if(response.data == "OK"){
                                    //vm.notes.splice($index,1);
                                    console.log("Done");
                                }
                            });

                    }
                })



        }
    }
})();