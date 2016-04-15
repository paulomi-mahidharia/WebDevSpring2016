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

    function EditNoteController(NoteService, $routeParams, $location, $sce, WidgetService) {

        var vm = this;

        vm.trustAsHtml = trustAsHtml;
        vm.editWidget = editWidget;

        var noteId;

        function init() {

            noteId = $routeParams.noteId;
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
                        vm.widgets = response.data;
                    }
                );
        }
        init();

        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function editWidget(widget){
            //console.log(widget);
            if(widget.widgetType == "TEXT"){

                //console.log("in text");
                $location.url("/note/"+noteId+"/text/"+widget._id);
            }
        }

    }
})();