(function(){
    angular
        .module("NoteSpace")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/index", {
                templateUrl: "index.html",
                controller: "SearchController"
            })
            .when("/index/:formatted_address", {
                templateUrl: "index.html",
                controller: "SearchController"
            })
            .when("/detail/:place_id", {
                templateUrl: "detail.view.html",
                controller: "DetailController"
            })
            .when("/", {
                templateUrl: "index.html",
                controller: "SearchController"
            })
            .otherwise({
                redirectTo: "/index"
            });
    }
})();
