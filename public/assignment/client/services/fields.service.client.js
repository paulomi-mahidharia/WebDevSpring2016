/**
 * Created by paulomimahidharia on 3/18/16.
 */
"use strict";

(function () {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            sortFields: sortFields
        };
        return api;


        function sortFields(formId, startIndex, endIndex) {

            return $http.put("/api/assignment/form/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function createFieldForForm(formId, field) {

            return $http.post("/api/assignment/form/"+formId+"/field", field);
        }

        function getFieldsForForm(formId) {

            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId, fieldId) {

            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {

            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, field) {

            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }
    }
})();