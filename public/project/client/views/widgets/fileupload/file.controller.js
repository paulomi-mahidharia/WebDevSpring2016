/**
 * Created by paulomimahidharia on 3/4/16.
 */


(function() {
    angular
        .module("NoteSpace")
        .controller("FileUploadController", FileUploadController);

    function FileUploadController($routeParams, WidgetService) {

        var vm = this;

        vm.noteId = $routeParams.noteId;

        var noteId = vm.noteId;

        //console.log(vm.noteId);

        function init(){

            var widgetId = $routeParams.widgetId;

            if(widgetId){

                //console.log(widgetId);

                vm.widgetId = widgetId;

                document.getElementById('fileEdit').style.display = 'inline';

                WidgetService
                    .getWidgetById(noteId, widgetId)
                    .then(
                        function(response){

                            //console.log(response);

                            vm.widget = response.data;

                            //console.log(vm.widget);

                            //console.log(vm.widgetId);
                        }
                    );


            }

        }
        init();


    }
})();
