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
                controller: "HomeController",
                controllerAs : "model"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController",
                controllerAs : "model"
            })
            .when("/text/:noteId", {
                templateUrl: "views/widgets/text/text.view.html",
                controller: "TextEditorController",
                controllerAs : "model"
            })
            .when("/map", {
                templateUrl: "views/widgets/googlemap/map.view.html",
                controller: "MapController"
            })
            .when("/fileupload", {
                templateUrl: "views/widgets/fileupload/fileupload.view.html",
                controller: "myCtrl"
            })
            .when("/note", {
                templateUrl: "views/note/note.view.html",
                controller: "NoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/createnote", {
                templateUrl: "views/createnote/createnote.view.html",
                controller: "CreateNoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/editnote/:noteId", {
                templateUrl: "views/createnote/editnote.view.html",
                controller: "EditNoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/todo", {
                templateUrl: "views/widgets/todoWidget/todoWidget.view.html",
                controller: "toDoController"
            })
            .when("/image", {
                templateUrl: "views/widgets/imageWidget/imageWidget.view.html",
                controller: "imageController"
            })
            .when("/youtube", {
                templateUrl: "views/widgets/youtubeApiWidget/youtubeApiWidget.view.html",
                controller: "YouTubeController"
            })
            .when("/notebook", {
                templateUrl: "views//notebook/notebook.view.html",
                controller: "noteBookController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs : "model"
            })
            .when("/favorites", {
                templateUrl: "views/favorites/favorites.view.html",
                controller: "FavoriteNotesController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

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
    }
})();