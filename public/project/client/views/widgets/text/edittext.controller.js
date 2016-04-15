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

        vm.updateText = updateText;

        function init(){
            var noteId = $routeParams.noteId;

            var widgetId = $routeParams.widgetId;
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

        function updateText(){

        }

// event handlers decleration
    }
})();