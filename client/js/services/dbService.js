(function() {
    var url = "https://webtech-proj-eduardsocea.c9users.io/";

    var dbService = function($http) {

        var getCategories = function() {
            return $http.get(url + "categories/")
                .then(function(response) {
                    return response.data;
                });
        };

        var getProducts = function() {
            return $http.get(url + "products/")
                .then(function(response) {
                    return response.data;
                });
        };

        var createProduct = function(name, price, datestamp, categoryId) {

            var data = {
                name: name,
                price: price,
                datestamp: datestamp,
                categoryId: categoryId
            }

            console.log(data);
            return $http.post(url + "products/", JSON.stringify(data))
                .then(function(response) {
                    return response.data;
                });
        };

        var updateProduct = function(id, name, price, datestamp, categoryId) {
            var data = {
                name: name,
                price: price,
                datestamp: datestamp,
                category: categoryId
            };

            return $http.put(url + "products/" + id, JSON.stringify(data))
                .then(function(response) {
                    return response.data
                });


        };

        var deleteProduct = function(id) {
            return $http.delete(url + "products/" + id)
                .then(function(response) {
                    return response.data;
                })
        };

        var getProductById = function(id) {
            return $http.get(url + "products/" + id)
                .then(function(response) {
                    return response.data;
                });
        }

        var getProductsWithCategory = function() {
            return $http.get(url + "productsWithCategory/")
                .then(function(response) {
                    return response.data;
                });
        }

        var getCategoryProducts = function() {
            return $http.get(url + "categoryProducts/")
                .then(function(response) {
                    return response.data;
                });
        }

        var getProductsByCategory = function(id) {
            return $http.get(url + "productsByCategoryId/" + id)
                .then(function(response) {
                    return response.data;
                });
        }

        var getSettings = function() {
            return $http.get(url + "settings/")
                .then(function(response) {
                    return response.data;
                });
        };

        var updateSettings = function(settings) {

            var errors = [];

            console.log(settings);

            for (var i = 0; i < settings.length; ++i) {
                var data = {
                    date: settings[i].date,
                    value: settings[i].value
                };

                $http.put(url + "settings/" + settings[i].id, JSON.stringify(data))
                    .then(function(response) {
                        if (response.data != 'updated') {
                            errors.push(response.data);
                        }
                    });


            }
            
            if (errors.length != 0){
                return 'server error';
            }else{
                return 'updated';
            }
            
        }

        return {
            getCategories: getCategories,
            getProducts: getProducts,
            createProduct: createProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            getProductsWithCategory: getProductsWithCategory,
            getCategoryProducts: getCategoryProducts,
            getProductsByCategory: getProductsByCategory,
            getProductById: getProductById,
            getSettings: getSettings,
            updateSettings: updateSettings
        };
    };

    var module = angular.module("webtechApp");
    module.factory("dbService", dbService);
})();
