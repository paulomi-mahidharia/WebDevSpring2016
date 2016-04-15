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
        vm.deleteWidget = deleteWidget;
        vm.getSrc = getSrc;

        var noteId;

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
        }
        init();

        function trustAsHtml(html) {

            return $sce.trustAsHtml(html);
        }

        function editWidget(widget){

            if(widget.widgetType == "TEXT"){

                $location.url("/note/"+noteId+"/text/"+widget._id);
            }

            if(widget.widgetType == "MAP"){

                $location.url("/note/"+noteId+"/map/"+widget._id);
            }
        }

        function deleteWidget(widget){

            var widgetIndex = vm.widgets.indexOf(widget);

            WidgetService
                .removeWidget(noteId, widget._id)
                .then(

                    function(response) {

                        vm.widgets.splice(widgetIndex, 1);
                    },

                    function(error) {

                        vm.error = error;
                    }
                );

        }

        function getSrc(src){

            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y&q="+src);
        }


    }
})();