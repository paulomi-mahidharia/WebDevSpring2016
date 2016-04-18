/**
 * Created by anvitasurapaneni on 4/18/16.
 */
"use strict";

(function(){
    angular
        .module("NoteSpace")
        .factory("GroupService", GroupService);

    function GroupService($http) {
        var api = {

            //group
            createGroupForUser: createGroupForUser,
            addMemberToGroup: addMemberToGroup,
            getGroupById: getGroupById,
            deleteGroupById: deleteGroupById,
            deleteMemberFromGroup: deleteMemberFromGroup,
            findAllGroups: findAllGroups,
            getAdminGroups: getAdminGroups,
            getMemberGroups: getMemberGroups,
            deleteCurrentMemberFromGroup: deleteCurrentMemberFromGroup,
            deleteGroupFromCurrentMember: deleteGroupFromCurrentMember,
            getMembersOfGroup: getMembersOfGroup,
            renameGroup: renameGroup,
            deleteNoteFromGroup: deleteNoteFromGroup
        }

        return api;

        function deleteNoteFromGroup(noteId, groupId){

            return $http.delete("/api/project/user/group/"+groupId+"/note/"+noteId);

        }

        function renameGroup(groupId, title){

            return $http.put("/api/project/user/group/"+groupId+"/title/"+title);
        }

        function getMembersOfGroup(groupId){

            return $http.get("/api/project/group/members/"+groupId);
        }

        function deleteGroupById(groupId) {

            return $http.delete("/api/project/user/group/"+groupId);
        }

        function deleteGroupFromCurrentMember(groupId, userId) {

            return $http.delete("/api/project/user/"+userId+"/unfollow1/group/"+groupId);
        }


        function deleteCurrentMemberFromGroup(userId, groupId) {

            return $http.delete("/api/project/user/"+userId+"/unfollow/group/"+groupId);
        }

        function getMemberGroups(userId){

            return $http.get("/api/project/group/member/"+userId);
        }

        function  getAdminGroups(userId){

            return $http.get("/api/project/group/admin/"+userId);
        }


        function findAllGroups(){

            return $http.get("/api/project/group");
        }

        function deleteMemberFromGroup(userId, groupId) {

            var deferred = $q.defer();

            var url = "/api/project/user/:userId/group/:groupId";
            url = url.replace(":userId", userId);
            url = url.replace(":groupId", groupId);

            $http.delete(url).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        function getGroupById(groupId){

            return $http.get("/api/project/user/group/"+groupId);
        }

        function addMemberToGroup(userId, groupId){

            return $http.post("/api/project/group/"+groupId+"/user/"+userId);
        }

        function createGroupForUser(userId, group) {

            return $http.post("/api/project/user/" + userId + "/group", group);
        }

    }
})();
