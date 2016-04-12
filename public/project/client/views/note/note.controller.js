/**
 * Created by paulomimahidharia on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("NoteController", NoteController);

    function NoteController(NoteService, $rootScope, $location){

        var vm = this;

        vm.deleteNote = deleteNote;
        vm.editNote = editNote;
        vm.favorite = favorite;

        function init() {

            NoteService.findAllNotesForUser($rootScope.currentUser._id)
                .then(function (foundNotes) {

                    vm.notes = foundNotes.data;

                    vm.$location = $location;
                });

            NoteService.findAllNoteBooksForUser($rootScope.currentUser._id)

                .then(function (foundNoteBooks){

                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;
                })
        }
        init();

        // event handlers implementation

        function deleteNote($index){
            var noteId = vm.notes[$index]._id;

            NoteService.deleteNoteById(noteId)
                .then(function(response) {



                    if(response) {
                        vm.notes = response;
                        init();
                    }
            });
        }

        function editNote($index){
            var noteId = vm.notes[$index]._id;

            $location.url("/editnote/"+noteId);
        }

        function favorite($index){

            var noteId = vm.notes[$index]._id;
            //console.log(noteId);

            NoteService.findNoteById(noteId)
                .then(function(response){
                    if(response) {

                        var note = response.data;
                        note.likes.push($rootScope.currentUser._id);

                        NoteService
                            .userLikesNote($rootScope.currentUser._id, note);
                    }
                })
        }
    }
})();
