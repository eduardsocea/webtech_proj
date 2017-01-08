(function () {
    'use strict'
    angular.module('webtechApp', [])
        .controller('MainController', MainController);

    function MainController($scope, $filter, dbService) {

        var onCategoryLoaded = function (data) {
            $scope.categories = data;
        }

        var onError = function (response) {
            console.log(response);
        }

        var onProductCreated = function (data) {
            onCategoryLoaded;
            dbService.getCategoryProducts().then(onCategoryproductsLoaded, onError);
            productCreated();
        }

        var onProductsCategoryLoad = function (data) {
            $scope.productsCategory = data;
        }

        var onCategoryproductsLoaded = function (data) {
            $scope.categoryProducts = data;
        }

        var onProductsByCategoryLoaded = function (data) {
            $scope.productsByCategory = data;
        }

        var onUpdatedLoaded = function (data) {
            $scope.productId = data.id;
            $scope.productName = data.name;
            $scope.productDatestamp = $filter('date')(data.datestamp, "MM/dd/yyyy");
            $scope.productPrice = parseFloat(data.price);
            $scope.productCategory = data.category;
        }


        var onProductUpdated = function (data) {
            dbService.getCategoryProducts().then(onCategoryproductsLoaded, onError);
            $scope.getProductsByCategory($scope.productCategory.id);
            productUpdated();
        }
        dbService.getCategories().then(onCategoryLoaded, onError);
        dbService.getCategoryProducts().then(onCategoryproductsLoaded, onError);
        $scope.addProduct = function () {
            var errors = validateProduct("#insert_product_modal");
            if (errors.length != 0) {
                $scope.errors = errors;
            } else {
                $scope.errors = null;
                dbService.createProduct($scope.productName, $scope.productPrice, $scope.productDatestamp, $scope.productCategory.id).then(onProductCreated, onError);
            }

        };

        $scope.getTotalPriceOfCategory = function (category) {
            var sum = 0;
            for (var i = 0; i < $scope.categoryProducts.length; ++i) {
                var aux = $scope.categoryProducts[i];
                if (aux.id == category.id) {
                    for (var j = 0; j < aux.products.length; ++j) {
                        sum += aux.products[j].price;
                    }
                }
            }
            return sum;
        }

        $scope.getProductsByCategory = function (categoryId) {
            dbService.getProductsByCategory(categoryId).then(function (data) {
                $scope.productsByCategory = groupProductsByDate(data);
                $scope.getSubTotal = function (datestamp) {
                    var sum = 0;
                    for (var i = 0; i < $scope.productsByCategory.length; ++i) {
                        var aux = $scope.productsByCategory[i];
                        if (aux.datestamp == datestamp) {
                            for (var j = 0; j < aux.products.length; ++j) {
                                sum += aux.products[j].price;
                            }
                        }
                    }
                    return sum;
                }
            }, onError);
        }

        $scope.deleteProduct = function (productId, $event) {
            dbService.deleteProduct(productId).then(productDeleted($event.target), onError);
        }

        $scope.loadUpdateProduct = function (productId) {
            dbService.getProductById(productId).then(onUpdatedLoaded, onError);
        }

        $scope.updateProduct = function (productId) {
            var errors = validateProduct("#edit_product_modal");
            if (errors.length != 0) {
                $scope.errors = errors;
            } else {
                $scope.errors = null;
                dbService.updateProduct(productId, $scope.productName, $scope.productPrice, $scope.productDatestamp, $scope.productCategory.id).then(onProductUpdated, onError);
            }
        }

    }

})();
