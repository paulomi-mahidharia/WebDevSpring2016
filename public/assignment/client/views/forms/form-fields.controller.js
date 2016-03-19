/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormFieldsController", FormFieldsController);

    function FormFieldsController(FieldService, $routeParams, $location, $scope, $uibModal, $log) {

        var vm = this;

        vm.fields = [];
        vm.field = {};

        vm.options = [];

        vm.removeField = removeField;
        vm.addField = addField;

        vm.oldIndex = -1;

        var formId = -1;

        function init() {

            if($routeParams.formId) {
                formId = $routeParams.formId;

                FieldService.getFieldsForForm(formId).then(function (response) {

                    vm.fields = response;
                    $scope.fields = vm.fields;
                });

            }  else {
                $location.url("/forms");
            }

            vm.options = [
                {name: "Single Line Text Field", value: "sline-text"},
                {name: "Multi Line Text Field", value: "mline-text"},
                {name: "Date Field", value: "date"},
                {name: "Dropdown Field", value: "dropdown"},
                {name: "Checkboxes Field", value: "checkbox"},
                {name: "Radio Buttons Field", value: "radio"}
            ];
        }
        init();

        function removeField($index) {

            var fieldId = vm.fields[$index]._id;
            FieldService.deleteFieldFromForm(formId, fieldId).then(function (response) {

                if(response === "OK") {

                    FieldService.getFieldsForForm(formId)
                        .then(function (response) {
                            vm.fields = response;
                            $scope.fields = vm.fields;
                        });
                }
            });
        }

        function addField() {

            var fieldType = vm.fieldType.value;

            switch (fieldType) {

                case "sline-text":
                    vm.field = createSingleLineField();
                    break;

                case "mline-text":
                    vm.field = createMultiLineField();
                    break;

                case "date":
                    vm.field = createDateField();
                    break;

                case "dropdown":
                    vm.field = createDropDownField();
                    break;

                case "checkbox":
                    vm.field = createCheckboxField();
                    break;

                case "radio":
                    vm.field = createRadioField();
                    break;

            }

            FieldService.createFieldForForm(formId, vm.field)
                .then(function (response) {
                    vm.fields = response;
                    $scope.fields = vm.fields;
                    vm.field = {};
            });

        }

        function createSingleLineField() {

            var field = {
                _id: null,
                label: "New Text Field",
                type: "TEXT",
                placeholder: "New Single-line Field"
            };

            return field;
        }

        function createMultiLineField() {

            var field = {
                _id: null,
                label: "New Text Field",
                type: "TEXTAREA",
                rows: "5",
                placeholder: "New Multi-line Field"
            };

            return field;
        }

        function createDateField() {

            var field = {
                _id: null,
                label: "New Date Field",
                type: "DATE"
            };

            return field;
        }

        function createDropDownField() {

            var field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            return field;
        }

        function createCheckboxField() {

            var field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            return field;
        }

        function createRadioField() {

            var field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            return field;
        }

        vm.open = open;
            function open($index) {
                var field = $scope.fields[$index];
                //console.log(field);

                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        selectedField: function () {
                            return field;
                        }
                    }
                });

                modalInstance.result.then(function (selectedField) {
                    $scope.selected = selectedField;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }

    }

    angular.module('FormBuilderApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, selectedField) {

        $scope.field = selectedField;
        $scope.ok = function () {

            if($scope.textLabel){
                $scope.field.label = $scope.textLabel;
            }

            if($scope.field.type != "DATE"){
                if ($scope.textPlaceholder) {
                    if ($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA") {

                        $scope.field.placeholder = $scope.textPlaceholder;

                    } else {

                        checkOtherFields();
                    }
                }
            }

            function checkOtherFields(){
                var content = $scope.newPlaceholder;
                content = content.trim();
                var rawOptions = content.split("\n");
                var options = [];

                for (var i in rawOptions) {
                    var rawField = rawOptions[i].split(":");
                    var option = {label: rawField[0], value: rawField[1]};
                    options.push(option);
                }

                $scope.field.options = options;

            }

            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });


})();
