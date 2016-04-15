/**
 * Created by paulomimahidharia on 4/14/16.
 */
/**
 * Created by paulomimahidharia on 3/3/16.
 */

(function() {
    angular
        .module("NoteSpace")
        .controller("EditTextEditorController", EditTextEditorController);

    function EditTextEditorController($routeParams, WidgetService, $location) {
        var vm = this;

        var noteId;
        var widgetId;

        vm.updateText = updateText;

        function init(){
            noteId = $routeParams.noteId;

            widgetId = $routeParams.widgetId;
            //console.log(widgetId);
            if(widgetId){
                WidgetService.getWidgetById(noteId, widgetId)
                    .then(
                        function(response){
                            console.log("Got widget");
                            vm.widget = response.data;
                        }
                    );
            }
        }
        init();

        function updateText(widget){

            WidgetService
                .updateWidget(noteId, widgetId, widget)
                .then(
                    function(response) {
                        $location.url("/editnote/"+noteId);
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

// event handlers decleration
    }
})();