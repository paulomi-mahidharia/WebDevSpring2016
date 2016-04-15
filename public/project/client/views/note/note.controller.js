/**
 * Created by paulomimahidharia on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("NoteController", NoteController);

    function NoteController(NoteService, $rootScope, $location, UserService){

        var vm = this;

        vm.deleteNote = deleteNote;
        vm.editNote = editNote;
        vm.favorite = favorite;
        vm.isNoteInFavourites = isNoteInFavourites;

        function init() {

            NoteService.findAllNotesForUser($rootScope.currentUser._id)
                .then(function (foundNotes) {

                    var favNotes = [];

                    vm.notes = foundNotes.data;
                    //console.log(vm.notes);

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

            //var noteId = vm.notes[$index]._id;
            //
            //var userFav = $rootScope.currentUser.likes;
            //for(var index in userFav){
            //    if(userFav[index] === noteId){
            //        alert("Already added to favourites");
            //        return;
            //    }
            //}

            var l = vm.note.likes.indexOf(currentUser._id);
            if(l >= 0) {
                vm.note.likes.splice(l, 1);
            } else {
                vm.note.likes.push($rootScope.currentUser._id);
            }

            $rootScope.currentUser.likes.push(vm.notes[$index]._id);

            NoteService.findNoteById(noteId)
                .then(function(response){
                    if(response) {

                        var note = response.data;
                        vm.notes[$index].likes.push($rootScope.currentUser._id);

                        NoteService
                            .userLikesNote($rootScope.currentUser._id, note);
                    }
                });


        }
    }

    function isNoteInFavourites(favourites, note) {

       var noteId = note._id;
        for(var i in favourites) {
            if(favourites[i] === noteId)
                return true;
        }
        return false;
    }
})();
