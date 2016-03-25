/**
 * Created by paulomimahidharia on 3/15/16.
 */

(function(){
    angular
        .module("OmdbApp")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials
        };
        return api;

        function findUserByCredentials(credentials) {
            return $http.post("api/project/user", credentials);
        }
    }
})();