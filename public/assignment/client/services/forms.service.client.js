/**
 * Created by paulomimahidharia on 2/20/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return api;

        function createFormForUser(userId, form) {

            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userID) {

            return $http.get("/api/assignment/user/"+userID+"/form");
        }

        function deleteFormById(formID) {

            return $http.delete("/api/assignment/form/"+formID);
        }

        function updateFormById(formID, newForm) {

            return $http.put("/api/assignment/form/"+formID, newForm);
        }

        function findFormById(formID) {

            return $http.get("/api/assignment/form/"+formID);
        }
    }
})();