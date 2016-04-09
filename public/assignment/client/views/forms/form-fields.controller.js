
/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormFieldsController", FormFieldsController);

    function FormFieldsController(FieldService, $routeParams, $location, $uibModal, $log) {

        var vm = this;

        vm.fields = [];
        vm.field = {};
        vm.options = [];

        vm.oldIndex = -1;
        var formId = -1;

        vm.removeField = removeField;
        vm.addField = addField;
        vm.open = open;
        vm.sortFields = sortFields;

        function init() {

            if($routeParams.formId) {

                formId = $routeParams.formId;

                FieldService.getFieldsForForm(formId)

                    .then(function (response) {

                        vm.fields = response.data.fields;
                });

            }
            else {
                $location.url("/forms");
            }

            vm.options = [
                {name: "Single Line Text Field", value: "sline-text"},
                {name: "Multi Line Text Field", value: "mline-text"},
                {name: "Date Field", value: "date"},
                {name: "Dropdown Field", value: "dropdown"},
                {name: "Checkboxes Field", value: "checkbox"},
                {name: "Radio Buttons Field", value: "radio"},
                {name: "Email", value: "email"},
                {name: "Password", value: "password"}
            ];
        }
        init();


        //Function to sort fields

        function sortFields(start, end) {
            FieldService
                .sortFields(formId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

        //Function to remove field

        function removeField($index) {

            var fieldId = vm.fields[$index]._id;

            FieldService.deleteFieldFromForm(formId, fieldId)

                .then(function (response) {

                    if (response.data == "OK") {
                        vm.fields.splice($index, 1);
                    }
                });
        }

        //Function to add field

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

                case "email":
                    vm.field = createEmailField();
                    break;

                case "password":
                    vm.field = createPasswordField();
                    break;

            }

            FieldService.createFieldForForm(formId, vm.field)

                .then(function (response) {

                    vm.fields = response.data.fields;
                    init();
                    vm.field = {};
                });

        }

        function createSingleLineField() {

            var field = {
                label: "New Text Field",
                type: "TEXT",
                placeholder: "New Single-line Field"
            };

            return field;
        }

        function createMultiLineField() {

            var field = {
                label: "New Text Field",
                type: "TEXTAREA",
                rows: "5",
                placeholder: "New Multi-line Field"
            };

            return field;
        }

        function createDateField() {

            var field = {
                label: "New Date Field",
                type: "DATE"
            };

            return field;
        }

        function createDropDownField() {

            var field = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            return field;
        }

        function createCheckboxField() {

            var field = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            return field;
        }

        function createRadioField() {

            var field = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            return field;
        }

        function createEmailField(){

            var field = {label: "New Email Field",
                type: "EMAIL",
                placeholder: "New Email Field"};

            return field;
        }

        function createPasswordField(){

            var field = {label: "New Password Field",
                type: "EMAIL",
                placeholder: "New Password Field"};

            return field;
        }


        //Function to open field

        function open($index){

            vm.editTheField = vm.fields[$index];

            var modalInstance = $uibModal.open({

                templateUrl: 'popup.html',
                controller: 'popupCtrl',
                resolve: {
                    field: function () {

                        return vm.editTheField;
                    }
                }

            });

            modalInstance.result
                .then(function (field) {

                    return FieldService.updateField(formId, field._id, field);

                })
                .then(function (response) {

                    if (response.data === "OK") {
                        init();
                    }
                });
        }
    }


    angular.module('FormBuilderApp').controller('popupCtrl', function ($scope, $uibModalInstance, field) {

        $scope.field = field;
        $scope.ok = function () {

            if($scope.newLabel) {

                $scope.field.label = $scope.newLabel;
            }

            if($scope.field.type != "DATE") {

                if($scope.newPlaceholder) {

                    if($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA" ||
                        $scope.field.type === "EMAIL" || $scope.field.type === "PASSWORD"){

                        $scope.field.placeholder = $scope.newPlaceholder;

                    } else {

                        OtherFields();
                    }
                }

            }

            function OtherFields() {

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