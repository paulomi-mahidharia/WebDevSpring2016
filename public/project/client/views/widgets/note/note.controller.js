/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("NoteController", NoteController);

    function NoteController($scope){
        var noteBooks  = [
            {"id": "000", "name": "notebook1"},
            {"id": "001", "name": "notebook2"},
            {"id": "002", "name": "notebook3"}
        ];

        var notes = [{"id": "01", "name":"note1", "notebook": "notebook1"},
            {"id": "02", "name":"note2", "notebook": "notebook2"},
            {"id": "03", "name":"note3", "notebook": "notebook3"}];



        $scope.notebooks = noteBooks;
        $scope.notes = notes;

        $scope.selectedNote = null;


        // event handlers decleration
        $scope.addNote = addNote;
        $scope.deleteNote = deleteNote;
        $scope.selectNote = selectNote;
        $scope.updateNote = updateNote;


        // event handlers implementation
        function addNote(widget){
            var  newID = (new Date).getTime();
            var newNote =  {id: newID,
                name: widget.name,
                notebook: $scope.widget.selected};

            $scope.widget ={};
            $scope.notes.push(newNote);
        }

        function deleteNote(widget){
            var index = $scope.notes.indexOf(widget);
            $scope.notes.splice(index, 1);

        }

        function selectNote(widget)
        {
            var selected_note_index = $scope.notes.indexOf(widget);
            $scope.widget = {id: widget.id,
                            name: widget.name,
                            selected : widget.notebook};
            $scope.selectedNote = $scope.notes[$scope.notes.indexOf(widget)];

        }

        function updateNote(widget)
        {
            var newNote = {id: $scope.selectedNote.id,
                            name: widget.name,
                            notebook: $scope.widget.selected};
            $scope.notes[$scope.notes.indexOf($scope.selectedNote)] = newNote;
            $scope.widget ={};
        }

    }
})();
