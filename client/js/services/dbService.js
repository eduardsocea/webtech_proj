(function(){
    var url = "https://webtech-proj-eduardsocea.c9users.io/";

    var dbService = function($http){

        var getCategories = function(){
            return $http.get(url+ "categories/")
                .then(function(response){
                    return response.data;
                });
        };

        return{
            getCategories: getCategories
        };
    };

    var module = angular.module("webtechApp");
    module.factory("dbService", dbService);
})();