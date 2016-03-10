/**
 * Created by paulomimahidharia on 3/3/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("TextEditorController", textEditorController );

    function textEditorController($scope){
        var widgets  = [
            {"_id": "000", "notetext":"This is my first note."},
            {"_id": "010", "notetext":"Meet Nikita Khanna at Boston house of pizza at 6.00pm."},
            {"_id": "020", "notetext": "Next job shift on Monday 2 to 8 pm."}
        ];
        $scope.widgets = widgets;

        // event handlers decleration
        $scope.addText = addText;
        $scope.deleteText = deleteText;
        $scope.selectText = selectText;
        $scope.updateText = updateText;


        // event handlers implementation
        function addText(widget){
            var newId = (new Date).getTime();
            var newText =  {_id: newId,
                            notetext: widget.notetext};
            $scope.widgets.push(newText);
            $scope.widget ={};
        }

        function deleteText(widget){
            var index = $scope.widgets.indexOf(widget);
            $scope.widgets.splice(index, 1);

        }

        function  selectText(widget)
        {
            $scope.selectedTextIndex = $scope.widgets.indexOf(widget);
            $scope.widget = {_id: widget._id,
                notetext: widget.notetext};
        }

        function  updateText(widget)
        {
            $scope.widgets[$scope.selectedTextIndex] = widget;
            $scope.widget={};
        }

    }
})();