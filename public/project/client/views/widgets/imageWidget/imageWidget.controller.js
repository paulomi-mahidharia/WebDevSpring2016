/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("imageController", imageController );

    function imageController($scope){
        var images  = [
            {"_id": "000", "url":"http://static3.businessinsider.com/image/51b5fc246bb3f7f33a000017/19-unlikely-animals-who-are-best-friends.jpg"},
            {"_id": "010", "url":"http://static.ddmcdn.com/gif/1-cow_670x440-animals-in-your-medicine-cabinet-photos-140204.jpg"},
            {"_id": "020", "url": "http://i4.mirror.co.uk/incoming/article4041282.ece/ALTERNATES/s615/Red-Fox-in-The-Wonder-of-Animals.jpg"},
        ];
        $scope.images = images;

        // event handlers decleration
        $scope.addImage = addImage;
        $scope.deleteImage = deleteImage;
        $scope.selectImage = selectImage;
        $scope.updateImage = updateImage;


        // event handlers implementation
        function addImage(image){
            console.log("add image url");
            console.log( image);
            var  newID = (new Date).getTime();
            var NewImage =  {_id: newID,
                url: image.url};
            $scope.image ={};
            $scope.images.push(NewImage);
        }

        function deleteImage(image){
            var index = $scope.images.indexOf(image);
            $scope.images.splice(index, 1);

        }

        function  selectImage(image)
        {
            $scope.selectedImageIndex = $scope.images.indexOf(image);

            $scope.image = {_id: image._id,
                url: image.url};
        }

        function  updateImage(image)
        {
            $scope.images[$scope.selectedImageIndex] = image;
        }

    }
})();
