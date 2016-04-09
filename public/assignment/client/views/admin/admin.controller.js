/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService){
        var vm = this;

        (function init() {

            UserService.findAllUsers()
                .then(
                    function(allUsers){
                        console.log(allUsers);
                        vm.users = allUsers.data;
                    }
                );

        })();
    }
})();
