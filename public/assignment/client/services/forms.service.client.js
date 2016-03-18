/**
 * Created by paulomimahidharia on 2/20/16.
 */
"use strict";
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

        function createFormForUser(userID, form) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userID);

            $http.post(url, form).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllFormsForUser(userID) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userID);

            //return $http.get("/api/assignment/user/"+userID+"/form");
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteFormById(formID) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);

            $http.delete(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function updateFormById(formID, newForm) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);
            $http.put("/api/assignment/form/"+formID, newForm).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }
        function findFormById(formID) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);

            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }
    }
})();