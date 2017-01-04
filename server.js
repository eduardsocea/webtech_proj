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

//Categories
app.get('/categories', function(request, response){
    /*global Category*/
    Category.findAll().then(function(categories){
        response.status(200).send(categories);
    });
});