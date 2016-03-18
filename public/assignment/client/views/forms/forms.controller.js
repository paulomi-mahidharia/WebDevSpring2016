/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, FormService, $rootScope) {

        var vm = this;

        function init() {

            FormService.findAllFormsForUser($rootScope.currentUser._id)
                .then(function getForms(foundForms) {
                    vm.forms = foundForms;
                    //console.log(vm.forms);
                    vm.$location = $location;
                });
        }
        init();

        var toBeUpdatedIndex = -1;

        //Event handler declarations
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.deleteForm = deleteForm;


        function addForm(form) {

            FormService.createFormForUser($rootScope.currentUser._id, form)
                .then(function(response) {
                    vm.forms = response;
            });
            vm.form = {};
        }

        function updateForm(form) {

            FormService.updateFormById(form._id, form)
                .then(function (response) {
                        if (response === "OK") {
                            FormService.findFormById(form._id)
                                .then(function(updatedForm) {
                                    var formIndex = vm.forms.indexOf(updatedForm);
                                    vm.forms[formIndex] = updatedForm;
                                });
                            }
                        });
            vm.form={};
        }

        function deleteForm($index) {

            var formId = vm.forms[$index]._id;
            FormService.deleteFormById(formId).then(function(response) {

                if(response === "OK") {
                    init();
                }
            });
        }

        function selectForm($index) {
            vm.form = {};
            var selectedForm = vm.forms[$index];
            vm.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };
            toBeUpdatedIndex = $index;
        }


    }
})();
