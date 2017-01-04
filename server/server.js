var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodeadmin = require('nodeadmin');
var Sequelize = require("sequelize");

var app = new express();

app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT);
app.use(nodeadmin(app));
app.use('/admin', express.static('admin'));

var sequelize = new Sequelize('webtech_proj_db', 'eduardsocea', '',{
    dialect:'mysql',
    host: '127.0.0.1',
    port: 3306
});



var Category = sequelize.define('categories', {
    name:{
        type: Sequelize.STRING,
        field: 'name'
    }
}, {
  timestamps: false 
});

Category.sync({force: true})
    .then(function () { return Category.create({name: "Alimentare"})})
    .then(function () { return Category.create({name: "Imbracaminte"})})
    .then(function () { return Category.create({name: "Electronice"})})
    .then(function () { return Category.create({name: "Electrocasnice"})})
    .then(function () { return Category.create({name: "Altele"})});
    

var Product = sequelize.define('products', {
    name:{
        type: Sequelize.STRING,
        field: 'name'
    },
    price:{
        type: Sequelize.DECIMAL,
        field: 'price'
    },
    datestamp:{
        type: Sequelize.DATE,
        field: 'datestamp'
    },
    categoryId:{
        type: Sequelize.INTEGER,
        field: 'categoryId'
    }
}, {
  timestamps: false 
});

Product.sync({force: true});    
    
Category.hasMany(Product, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false
  }
});

//Products
app.post('/products', function(request, response){
    Product.create(request.body).then(function(product){
        Product.findById(product.id).then(function(product){
            response.status(201).send(product);
        });
    });
});

app.get('/products', function(request, response){
    Product.findAll().then(function(products){
        response.status(200).send(products);
    });
});

app.put('/products/:id', function(request, response){
   Product.findById(request.params.id)
   .then(function(product){
       if(product){
           product.updateAttribute(request.body)
           .then(function(){
               response.status(200).send('updated');
           })
           .catch(function(error){
               console.warn(error);
               response.status(500).send('server error');
           });
       }
       else{
           response.status(404).send();
       }
   })
});


app.delete('/products/:id', function(request, response){
   Product.findById(request.params.id)
   .then(function(product){
       if(product){
           product.destroy(request.body)
           .then(function(){
               response.status(200).send('removed');
           })
           .catch(function(error){
               console.warn(error);
               response.status(500).send('server error');
           });
       }
       else{
           response.status(404).send();
       }
   })
});

//Categories
app.get('/categories', function(request, response){
    Category.findAll().then(function(categories){
        response.status(200).send(categories);
    });
});