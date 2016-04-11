/**
 * Created by paulomimahidharia on 4/8/16.
 */
/**
 * Created by paulomimahidharia on 3/25/16.
 */
(function() {
    angular
        .module("NoteSpace")
        .controller("EditNoteController", EditNoteController);

    function EditNoteController(NoteService, $routeParams, $location) {

        var vm = this;

        function init() {

            var noteId = $routeParams.noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){
                        //console.log(response);
                        vm.widget = response.data;
                    }
                );
        }
        init();

    }
})();