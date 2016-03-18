/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/fields", {
                templateUrl: "views/forms/form-fields.view.html",
                controller: "FormFieldsController"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController",
                controllerAs : "model"
            })
            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs : "model"
                /*resolve: {
                    checkLoggedIn: checkLoggedIn
                }*/
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    /*function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser) {
                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    }*/
})();