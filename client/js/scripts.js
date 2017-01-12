var monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
];

$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  $('#insert_product_modal').modal({
    complete: function () { clearForm('#insert_product_modal'); }
  });

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'mm/dd/yyyy'
  });

  $('.tooltipped').tooltip({ delay: 0 });

});

function getIndexOfObjectArray(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] == value) {
      return i;
    }
  }
  return null;
}

// function createGroupedProductsModel(categories, products) {
//   var groupedProducts = [];

//   for (key in categories) {

//     groupedProducts.push({
//       category: categories[key].name,
//       products: []
//     });
//   }


//   for (key in products) {
//     var gKey = getIndexOfObjectArray(groupedProducts, "category", products[key].category.name);
//     groupedProducts[gKey].products.push(products[key])

//   }

//   console.log(groupedProducts);
// }

function sortProductsByDate(products) {
  for (var i = 0; i < products.length - 1; ++i) {
    var monthI = products[i].datestamp.split(' ')[0];
    var yearI = products[i].datestamp.split(' ')[1];
    for (var j = i + 1; j < products.length; ++j) {
      var monthJ = products[j].datestamp.split(' ')[0];
      var yearJ = products[j].datestamp.split(' ')[1];
      if (monthNames.indexOf(monthI) < monthNames.indexOf(monthJ) && yearI <= yearJ) {
        var aux = products[i];
        products[i] = products[j];
        products[j] = aux;
        monthI = products[i].datestamp.split(' ')[0];
        yearI = products[i].datestamp.split(' ')[1];
      } else if (monthNames.indexOf(monthI) > monthNames.indexOf(monthJ) && yearI < yearJ) {
        var aux = products[i];
        products[i] = products[j];
        products[j] = aux;
        monthI = products[i].datestamp.split(' ')[0];
        yearI = products[i].datestamp.split(' ')[1];
      }
    }
  }
}

function groupProductsByDate(products) {
  var groupedProducts = [];

  for (var i = 0; i < products.length; ++i) {
    var dateObj = new Date(products[i].datestamp);
    var month = dateObj.getMonth();
    var year = dateObj.getUTCFullYear();
    var finalDate = monthNames[month] + " " + year;
    var indexOfDatestamp = getIndexOfObjectArray(groupedProducts, "datestamp", finalDate);
    if (indexOfDatestamp == null) {
      groupedProducts.push({
        datestamp: finalDate,
        products: [products[i]]
      });
    } else {
      groupedProducts[indexOfDatestamp].products.push(products[i]);
    }
  }

  sortProductsByDate(groupedProducts);
  return groupedProducts;
}

function drawPieChart(){
  
}
