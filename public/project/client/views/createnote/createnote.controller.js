/**
 * Created by paulomimahidharia on 4/15/16.
 */
/**
 * Created by paulomimahidharia on 3/25/16.
 */
(function() {
    angular
        .module("NoteSpace")
        .controller("CreateNoteController", CreateNoteController);

    function CreateNoteController(NoteService, $rootScope, $location) {

        var vm = this;

        function init() {

        }
        init();

        vm.addNote = addNote;

        function addNote(note){

            var currentUser = $rootScope.currentUser;
            var currentUserId = currentUser._id;

            note.createdBy = currentUser;
            note.createdDate = new Date();

            NoteService.createNoteForUser(currentUserId, note)
                .then(
                    function(response) {

                        $location.url("/editnote/"+response.data._id);

                    });


            vm.widget = {};
        }

    }
})();