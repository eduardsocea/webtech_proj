var successMessages = {
  ProductCreated: 'Produsul a fost creat cu succes',
  ProductDeleted: 'Produsul a fost sters cu succes',
  ProductUpdated: 'Produsul a fost actualizat cu succes'
}


function productCreated() {
  // $('#insert_product_modal').modal('close');
  clearForm('#insert_product_modal')
  Materialize.toast(successMessages.ProductCreated, 2000);
}

function productDeleted(itm) {
  var body = $(itm).parents('tbody');
  if (body.children().length == 2) {
    body.remove();
  } else {
    $(itm).parents('tr').remove();
  }

  Materialize.toast(successMessages.ProductDeleted, 2000);
};


function productUpdated() {
  clearForm('#edit_product_modal');
  $('#edit_product_modal').modal('close');
  Materialize.toast(successMessages.ProductUpdated, 2000);

}