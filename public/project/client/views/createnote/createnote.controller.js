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

            NoteService.createNoteForUser($rootScope.currentUser._id, note)
                .then(
                    function(response) {

                        $location.url("/editnote/"+response.data._id);
                        //return FormService.findAllFormsForUser($rootScope.currentUser._id)
                    });


            vm.widget = {};
        }

    }
})();