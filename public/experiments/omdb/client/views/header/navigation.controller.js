/**
 * Created by paulomimahidharia on 3/15/16.
 */
(function(){
    angular
        .module("OmdbApp")
        .controller("NavigationController", navigationController);

    function navigationController($location) {
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();
    }
})();