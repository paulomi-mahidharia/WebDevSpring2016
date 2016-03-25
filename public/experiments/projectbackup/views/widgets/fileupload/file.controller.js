/**
 * Created by paulomimahidharia on 3/4/16.
 */
<<<<<<< HEAD:public/experiments/projectbackup/views/widgets/fileupload/file.controller.js
var myApp = angular.module('NoteSpace');
=======
var myApp = angular.module('myApp', []);
>>>>>>> parent of fba871b... Latest file upload:public/project/views/widgets/fileupload/file.controller.js

widgets = [];

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                console.log(file);
            })
            .error(function(){
            });
    }
}]);

myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.dir(file);
        widgets.push(file);
        console.log(widgets);
        $scope.data = widgets;


        var uploadUrl = "../proattachment/myfiles";
        fileUpload.uploadFileToUrl(file, uploadUrl);

    };




}]);
