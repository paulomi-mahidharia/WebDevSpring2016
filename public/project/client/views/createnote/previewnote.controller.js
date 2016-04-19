/**
 * Created by paulomimahidharia on 4/19/16.
 */
(function() {
    angular
        .module("NoteSpace")
        .controller("PreviewNoteController", PreviewNoteController);

    function PreviewNoteController(NoteService, $routeParams, WidgetService, $rootScope) {

        var vm = this;

        var noteId;

        var userId = $rootScope.currentUser._id;

        function init() {

            noteId = $routeParams.noteId;
            vm.noteId = noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){

                        vm.widget = response.data;
                    }
                );

            WidgetService.getWidgets(noteId)
                .then(
                    function(response){

                        vm.widgets = response.data;

                    }
                );

            NoteService
                .findAllNoteBooksForUser(userId)
                .then(
                    function (response){

                        vm.notebooks = response.data;
                    }
                )

        }
        init();

    }
})();