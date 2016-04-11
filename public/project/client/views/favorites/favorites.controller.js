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
            var noteId = vm.notes[$index].id;
            //console.log(noteId);
            NoteService.deleteNoteById(noteId)
                .then(function(response) {

                if(response) {
                    vm.notes = response;
                    init();
                }
                //console.log("No");
            });
        }
    }
})();