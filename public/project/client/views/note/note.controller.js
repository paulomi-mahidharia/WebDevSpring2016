/**
 * Created by paulomimahidharia on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("NoteController", NoteController);

    function NoteController(NoteService, $rootScope, $location){

        var vm = this;

        vm.deleteNote = deleteNote;
        vm.selectNote = selectNote;
        vm.updateNote = updateNote;
        //vm.addNote = addNote;


        var selectedIndex = -1;

        function init() {
            //console.log("Init");

            NoteService.findAllNotesForUser($rootScope.currentUser._id)
                .then(function (foundNotes) {
                    console.log(foundNotes.data);
                    vm.notes = foundNotes.data;
                    /*for(var note in $rootScope.notes){
                        vm.notes.push($rootScope.notes[note]);
                    }*/
                    vm.$location = $location;
                });

            NoteService.findAllNoteBooksForUser($rootScope.currentUser._id)
                .then(function (foundNoteBooks){
                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;
                })
        }
        init();

        // event handlers implementation

        function deleteNote($index){
            var noteId = vm.notes[$index].id;
            //console.log(noteId);
            NoteService.deleteNoteById(noteId)
                .then(function(response) {

                    if(response) {
                        vm.notes = response;
                        init();
                    }
            });
        }

        function selectNote($index){
            var noteId = vm.notes[$index].id;
            NoteService.selectNoteById(noteId)
                .then(function(response){
                    if(response){
                        var selectedNote = response.data;
                        //console.log(selectedNote);
                        vm.widget = selectedNote;
                    }
                });
            selectedIndex = $index;
        }

        function updateNote(widget){
            console.log(vm.widget);
            if (widget.name != null && selectedIndex != -1) {

                var position = vm.notes[selectedIndex];
                var newNote = {
                    "id": widget.id,
                    "name": widget.name,
                    "notebook": widget.notebook,
                    "likedBy": widget.likedBy,
                    "createdBy": widget.createdBy
                };
                NoteService.updateNoteById(widget.id,newNote)
                    .then(function (response) {
                        vm.notes[selectedIndex] = response.data;
                        vm.widget.name = null;
                        vm.selectedIndex = -1;
                    });

            }
        }

        /*function addNote(widget){

            NoteService.createNoteForUser($rootScope.currentUser._id, widget)
                .then(function(response) {
                    vm.notes = response.data;
                });
            vm.notes = {};
            $location.url("/note");
        }*/
    }
})();
