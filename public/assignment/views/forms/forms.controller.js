/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope) {


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;

        FormService.findAllFormsForUser($rootScope.newUser._id, getForms);

        function getForms(foundForms) {
            $scope.forms = foundForms;
        }

        function addForm(form) {
            FormService.createFormForUser($rootScope.newUser._id, form, createForm);

            function createForm(newForm) {
                $scope.forms.push(newForm);
                $scope.form = {};
            }
        }

        function updateForm(form) {
            FormService.updateFormById(form._id, form, updateSelectedForm);

            function updateSelectedForm(updatedForm) {
                var formIndex = $scope.forms.indexOf(form);
                $scope.forms[formIndex] = updatedForm;
            }
        }

        function selectForm($index) {
            $scope.form = {};
            var selectedForm = $scope.forms[$index];
            $scope.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            }
        }

        function deleteForm($index) {
            var selectedFormId = $scope.forms[$index]._id;
            FormService.deleteFormById(selectedFormId, deleteSelectedForm);

            function deleteSelectedForm(formsAfterDeletion) {
                FormService.findAllFormsForUser($rootScope.newUser._id, getForms);

                function getForms(formsAfterDeletion) {
                    $scope.forms = formsAfterDeletion;
                }
            }
        }
    }
})();
