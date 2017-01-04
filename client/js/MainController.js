(function(){
    'use strict'
    angular.module('webtechApp', ['ngMaterial'])
        .controller('MainController', MainController);

    function MainController($scope, dbService){

        var onLoad = function(data){
            data.forEach(function(value){
                console.log(value);
            })
        }

        var onError = function(response){
            $scope.error = "Could not load";
        }
        dbService.getCategories().then(onLoad, onError)
    }

})();
