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
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController"
            })
            .when("/text", {
                templateUrl: "views/widgets/text/text.view.html",
                controller: "TextEditorController"
            })
            .when("/map", {
                templateUrl: "views/widgets/googlemap/map.view.html",
                controller: "MapController"
            })
            .when("/note", {
                templateUrl: "views/widgets/note/note.view.html",
                controller: "NoteController"
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

            .otherwise({
                redirectTo: "/home"
            });
    }
})();