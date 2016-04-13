/**
 * Created by paulomimahidharia on 3/3/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("TextEditorController", textEditorController );

    function textEditorController($routeParams, WidgetService, $location){
        var vm = this;

        // event handlers decleration

       vm.addText = addText;
        //$scope.deleteText = deleteText;
        //$scope.selectText = selectText;
        //$scope.updateText = updateText;
        //vm.trustAsHtml    = trustAsHtml;


        // event handlers implementation
        /*function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }*/


        function addText(widget){

            console.log(widget);

            var noteId = $routeParams.noteId;
            widget.widgetType = 'TEXT';

            WidgetService.addWidget(noteId, widget)
                .then(
                    function (response) {
                        console.log(response);
                        $location.url("/editnote/"+noteId);
                    }
                )
        }

        /*function addText(widget){
            var newId = (new Date).getTime();
            var newText =  {_id: newId,
                            notetext: widget.notetext};
            $scope.widgets.push(newText);
            $scope.widget ={};

            //WidgetService.addWidget()
        }*/

        /*function cancelText(widget){
            var index = $scope.widgets.indexOf(widget);
            $scope.widgets.splice(index, 1);

        }*/

        /*function  selectText(widget)
        {
            $scope.selectedTextIndex = $scope.widgets.indexOf(widget);
            $scope.widget = {_id: widget._id,
                notetext: widget.notetext};
        }

        function  updateText(widget)
        {
            $scope.widgets[$scope.selectedTextIndex] = widget;
            $scope.widget={};
        }*/

    }
})();