/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("toDoController", toDoController);

    function toDoController($scope){
        var toDoList  = [
            {"_id": "000", "task": "finish assignment"},
            {"_id": "001", "task": "finish project_individual_modules"}
        ];
        $scope.toDoList = toDoList;

        // event handlers decleration
        $scope.addToDo = addToDo;
        $scope.deleteToDo = deleteToDo;
        $scope.selectToDo = selectToDo;
        $scope.updateToDo = updateToDo;


        // event handlers implementation
        function addToDo(toDo){
            console.log("add todo");
            console.log( toDo);
            var  newID = (new Date).getTime();
            var NewToDo =  {_id: newID,
                task: toDo.task};
            $scope.toDo ={};
            $scope.toDoList.push(NewToDo);
        }

        function deleteToDo(toDo){
            var index = $scope.toDoList.indexOf(toDo);
            $scope.toDoList.splice(index, 1);

        }

        function  selectToDo(toDo)
        {
            $scope.selectedToDoIndex = $scope.toDoList.indexOf(toDo);

            $scope.toDo = {_id: toDo._id,
                task: toDo.task};
        }

        function  updateToDo(toDo)
        {
            $scope.toDoList[$scope.selectedToDoIndex] = toDo;
            $scope.toDo ={};
        }

    }
})();
