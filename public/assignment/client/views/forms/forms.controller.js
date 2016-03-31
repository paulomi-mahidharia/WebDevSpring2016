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
                .then(function (response) {
                    console.log(response);
                        vm.forms = response.data;
                        //console.log(vm.forms);
                        vm.$location = $location;

                });
        }
        init();

        var selectedIndex = -1;

        //Event handler declarations
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.deleteForm = deleteForm;

        //Function to add a form to the table for a particular user

        function addForm(form) {

            //Service to create the form for a given user

            FormService.createFormForUser($rootScope.currentUser._id, form)
                .then(function(response) {

                    return FormService.findAllFormsForUser($rootScope.currentUser._id)
                })
                .then(
                    function (response){
                        vm.forms = response.data;
                });
            vm.form = {};
        }

        //Function to update an existing form for a particular user

        function updateForm(form) {

            if (form.title != null && selectedIndex != -1) {

                var position = vm.forms[selectedIndex];
                var newForm = {
                    "title": form.title
                };

                FormService.updateFormById(form._id,newForm)
                    .then(function (response) {

                        return FormService.findFormById(form._id)
                    })
                    .then(
                        function (response) {
                            /*vm.forms[selectedIndex] = response.data;*/
                            vm.forms[selectedIndex] = response.data;

                            vm.selectedIndex = -1;
                        }
                    );
                vm.form = {};
            }}

        //Function to delete a form for a particular user
        function deleteForm($index) {

            var formId = vm.forms[$index]._id;
            FormService.deleteFormById(formId)
                .then(function(response) {

                    if(response.data == "OK") {
                        init();
                }
            });
        }

        //Function to select a form for a particular user
        function selectForm($index) {
            vm.form = {};
            var selectedForm = vm.forms[$index];
            vm.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };
            selectedIndex = $index;
        }
    }
})();
