/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl:"views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController"
            })
            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/textedit", {
                templateUrl: "views/widgets/textedit.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();