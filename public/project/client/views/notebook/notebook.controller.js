/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("noteBookController", noteBookController);

    function noteBookController($scope){
        /*var noteBooks  = [
            {"_id": "000", "name": "notebook1","description": "this is notebook1",
                "notes": [{"id": "03", "name":"note3"}]},
            {"_id": "001", "name": "notebook2","description": "this is notebook2",
                "notes": [{"id": "01", "name":"note1"},
                                                            {"id": "02", "name":"note2"}]}
        ];

        var notes = [{"id": "01", "name":"note1"},
            {"id": "02", "name":"note2"},
            {"id": "03", "name":"note3"},
            {"id": "04", "name":"note4"},
            {"id": "05", "name":"note5"}];*/


        //var selected_notebook = null;
        //$scope.noteBooks = noteBooks;
        //$scope.notes = notes;
        //$scope.selected_notebook = selected_notebook;



        // event handlers decleration
        $scope.addNoteBook = addNoteBook;
        $scope.deleteNoteBook = deleteNoteBook;
        $scope.selectNoteBook = selectNoteBook;
        $scope.updateNoteBook = updateNoteBook;


        // event handlers implementation
        function addNoteBook(notebook){
            console.log("add notebook");
            console.log( notebook);
            var  newID = (new Date).getTime();
            var NewNB =  {_id: newID,
                name: notebook.name,
                "description": notebook.description,
            notes: []};
            $scope.notebook ={};
            $scope.noteBooks.push(NewNB);
        }

        function deleteNoteBook(notebook){
            var index = $scope.noteBooks.indexOf(notebook);
            $scope.noteBooks.splice(index, 1);

        }

        function  selectNoteBook(notebook)
        {
            var selected_notebook_index = $scope.noteBooks.indexOf(notebook);
            console.log(selected_notebook_index);
            $scope.selected_notebook = $scope.noteBooks[selected_notebook_index];
            console.log($scope.selected_notebook);
            $scope.notebook = {"_id": notebook._id, "name": notebook.name, "description": notebook.description,
                "notes": notebook.notes};

        }

        function  updateNoteBook(notebook)
        {
            var newNB = {"_id": $scope.selected_notebook.id,
                "name": notebook.name,
                "description": notebook.description,
                "notes": $scope.selected_notebook.notes}
            $scope.noteBooks[$scope.noteBooks.indexOf($scope.selected_notebook)] = newNB;
            $scope.notebook ={};
        }

    }
})();
