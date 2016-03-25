/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("NoteController", NoteController);

    function NoteController($scope){

        //var vm = this;
        //vm.favorite = favorite;

        //var currentUser = $rootScope.currentUser;

        var noteBooks  = [
            {"id": "000", "name": "notebook1"},
            {"id": "001", "name": "notebook2"},
            {"id": "002", "name": "notebook3"}
        ];

        var notes = [{"id": "01", "name":"note1", "notebook": "notebook1", "likedBy":["123", "234"]},
            {"id": "02", "name":"note2", "notebook": "notebook2", "likedBy":["123"]},
            {"id": "03", "name":"note3", "notebook": "notebook3", "likedBy":["456"]}];



        $scope.notebooks = noteBooks;
        $scope.notes = notes;

        $scope.selectedNote = null;


        // event handlers decleration
        $scope.addNote = addNote;
        $scope.deleteNote = deleteNote;
        $scope.selectNote = selectNote;
        $scope.updateNote = updateNote;
        //$scope.favorite = favorite;


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

        /*function favorite(note) {
            if(currentUser){
                $scope.note.likes = [];
                $scope.note.likes.push(currentUser._id);
                NoteService.userLikesNote(currentUser._id, note);

            }
            else{
                $location.url("/login");
            }
        }*/

        /*function favorite(note) {
            if(currentUser) {
                vm.note.likes = [];
                vm.note.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }*/

    }
})();
