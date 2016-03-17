/**
 * Created by paulomimahidharia on 2/20/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    var forms = [];
    forms = [
        {"_id": "000", "title": "Contacts", "userId": 123},
        {"_id": "010", "title": "ToDo",     "userId": 123},
        {"_id": "020", "title": "CDs",      "userId": 234}
    ];

    function FormService(){

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return api;

        function createFormForUser(userId, form, callback){
            var newForm = {};

            newForm = {
                _id : (new Date).getTime(),
                title : form.title,
                userId : userId
            }

            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var foundForms = [];
            for(var i = 0; i< forms.length; i++){
                if(forms[i].userId === userId){
                    foundForms.push(forms[i]);
                }
            }
            callback(foundForms);
        }

        function deleteFormById(formId, callback){
            var formIndex = -1

            for(var i = 0; i< forms.length; i++) {
                if (forms[i]._id == formId) {
                    formIndex = forms.indexOf(forms[i]);
                    break;
                }
            }
            if(formIndex >= 0) {
                forms.splice(formIndex, 1);
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            var updatedFormIndex = -1;

            for(var i = 0; i< forms.length; i++) {
                if (forms[i]._id == formId) {
                    updatedFormIndex = i;
                    break;
                }
            }
            if(updatedFormIndex != -1) {
                forms[updatedFormIndex].title = newForm.title;
                forms[updatedFormIndex].userId = newForm.userId;
            }
            callback(forms[updatedFormIndex]);
        }





    }
})();
