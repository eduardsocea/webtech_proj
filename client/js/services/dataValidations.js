function clearForm(id) {
    $(id).find('input').val('');
    $(id).find('select').val('');
}

function clearArray(array) {
    var newArray = [];
    array.forEach(function (item) {
        if (item) {
            newArray.push(item);
        }
    });
    return newArray;
}

function requiredValidation(parentId, fieldId, fieldName) {
    var input = $(parentId).find(fieldId);
    console.log(input)
    if (input.val() == "") {
        return "Campul " + fieldName + " este obligatoriu."
    }
}

function validateProduct(parentId) {
    var errors = [];
    errors.push(requiredValidation(parentId, "#product_name", "nume"))
    errors.push(requiredValidation(parentId, "#product_price", "pret"))
    errors.push(requiredValidation(parentId, "#product_datestamp", "data"))
    errors.push(requiredValidation(parentId, "#category_id", "categoria"))

    errors = clearArray(errors);
    return errors;
}