/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("noteBookController", noteBookController);

    function noteBookController(NoteService,$rootScope, $location ){
        var vm = this;
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
        function init() {
            NoteService.findAllNoteBooksForUser($rootScope.currentUser._id)
                .then(function (foundNoteBooks){
                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;
                    console.log(vm.notebooks);
                })
        }
        init();



        // event handlers decleration

        vm.deleteNoteBook = deleteNoteBook;
        vm.selectNoteBook = selectNoteBook;
        vm.updateNoteBook = updateNoteBook;
        vm.addNoteBook = addNoteBook;


        // event handlers implementation




             function deleteNoteBook($index){
                 console.log($index);
            var NBId = vm.notebooks[$index]._id;

         NoteService.deleteNotebookById(NBId)
                .then(function(response) {

                    if(response) {
                        vm.notebooks = response;
                        init();
                    }
                });

        }







        function  selectNoteBook($index)
        {
            console.log("select clien side"+$index);
            var NBId = vm.notebooks[$index]._id;
            NoteService.selectNoteBookById(NBId)
                .then(function(response){
                    if(response){
                        var selectedNoteBook = response.data;
                        //console.log(selectedNote);
                        vm.notebook =  selectedNoteBook;
                    }
                });
            selectedIndex = $index;
 }











        function updateNoteBook(notebook){

            if (selectedIndex != -1){
                var position = vm.notebooks[selectedIndex];
                var newNB = {
                    "_id": notebook._id,
                    "name": notebook.name,
                    "description": notebook.description,
                    "notes": notebook.notes,
                    "createdBy": notebook.createdBy
                };


                NoteService.updateNoteBookById(notebook._id,newNB)
                    .then(function (response) {
                        console.log("response");
                        console.log(response.data);
                        console.log(selectedIndex);
                        vm.notebooks[selectedIndex] = response.data;
                        vm.notebook.name = null;
                        vm.selectedIndex = -1;
            });

        }}


        function addNoteBook(notebook){

            if (notebook != -1){

                var newNB = {
                    "_id": (new Date).getTime(),
                    "name": notebook.name,
                    "description": notebook.description,
                    "notes": notebook.notes,
                    "createdBy": $rootScope.currentUser._id
                };
            console.log(newNB);
                console.log($rootScope.currentUser);

                NoteService.addNoteBookForUser($rootScope.currentUser._id, newNB)
                    .then(function (response) {
                        if(response) {
                            vm.notebooks = response;
                            init();
                        }
                    });

            }}

  /*  function addNoteBook(notebook){
            console.log("add notebook");
            console.log( notebook);
            var  newID = (new Date).getTime();
            var NewNB =  {_id: newID,
                name: notebook.name,
                "description": notebook.description,
                notes: []};

         NoteService.addNoteBookForUser($rootScope.currentUser._id, NewNB)
                .then(function(response) {
                    vm.noteBooks = response;
                });

            vm.notebook ={};
            vm.noteBooks.push(NewNB);
        }



        */



    }
})();
