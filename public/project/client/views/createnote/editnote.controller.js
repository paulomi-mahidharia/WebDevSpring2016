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

    function EditNoteController(NoteService, $routeParams, $location, $sce) {

        var vm = this;

        vm.trustAsHtml = trustAsHtml;

        function init() {

            var noteId = $routeParams.noteId;
            vm.noteId = noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){
                        //console.log(response);
                        vm.widget = response.data;
                    }
                );

            WidgetService.getWidgets(noteId)
                .then(
                    function(response){
                        console.log(response);

                    }
                );
        }
        init();

        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

    }
})();