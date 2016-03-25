/**
 * Created by anvitasurapaneni on 2/3/16.
 */




(function() {

    angular
        .module("NoteSpace")
        .controller("YouTubeController", YouTubeController);

    function YouTubeController($http, $scope) {
        //$(init);
        //var $MovieName;
        //var $SearchMovieTitle;
        //var $tbody;

        $scope.selectVideo = selectVideo;
        $scope.trustSrcurl = function(data)
        {
            return $sce.trustAsResourceUrl(data);
        }

        function selectVideo(url){
            $scope.slelectedUrl = url;
            $scope.slelectedUrl.link = url.link;

            console.log(url);

        }

        function init() {
           var $searchurl = "https://www.googleapis.com/youtube/v3/search?part=snippet" +
               "&maxResults=5&q=CATEGORY&key=AIzaSyBId_35KFQKeZoRy-aRDZxma65PqdmkUI8";

            $VideoName = $("#VideoName");
            console.log($VideoName);
            $SearchVideoTitle = $("#SearchVideoTitle");
            $SearchVideoTitle.click(searchVideo);

            function searchVideo(){
                var category = $VideoName.val();
                var url = $searchurl.replace("CATEGORY", category);
                console.log("new url:");
                console.log(url);


                $http.get(url)
                    .success(callback);
            }






        }
        init();

        function callback(response) {

            var url_temp = "http://www.youtube.com/embed/ID?autoplay=1";
            $scope.data = response.items;
            console.log("Data");
            console.log($scope.data);
            var data = $scope.data;
            var url_link = {};
            var urls = [];
            for(var i =0; i<data.length; i++){
                var newid = data[i].id.videoId;
                var title = data[i].snippet.title;
                console.log(newid);

                var v1 = url_temp.replace("ID", newid);
                console.log("v1:");
                console.log("title:");
                console.log(title);
                console.log(v1);
             //   url_link = {"link": v1}
             //   console.log(url_link);
               // urls.push(url_link);
                urls.push(v1);
                console.log(urls);
                url_temp = "http://www.youtube.com/embed/ID?autoplay=1"
                $scope.urls = urls;
            }
        }
console.log($scope.urls);
    }


})();