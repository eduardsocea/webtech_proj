(function () {

    var dbValidation = function () {

        var onProductCreated = function (data) {

        }

        var onCategoryLoaded = function (data) {
            return data;
        }
        return {
            onCategoryLoaded: onCategoryLoaded
        };
    };

    var module = angular.module("webtechApp");
    module.factory("dbValidation", dbValidation);

})();