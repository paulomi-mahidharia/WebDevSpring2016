(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http){
        var api = {
            findMovieByTitle: findMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        }

        return api;

        function findMovieByTitle(title, callback){
            console.log(title);
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }
        function findMovieByImdbID(imdbID, callback){
            console.log(imdbID);
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }
    }
})();
