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
    port: 3306,
    
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



var Category = sequelize.define('categories', {
    name:{
        type: Sequelize.STRING,
        field: 'name'
    }
}, {
  timestamps: false 
});


    
    
Product.belongsTo(Category);    
Category.hasMany(Product, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false
  }
});

// sequelize.sync({force: true})
//     .then(function () { return Category.create({name: "Alimentare"})})
//     .then(function () { return Category.create({name: "Imbracaminte"})})
//     .then(function () { return Category.create({name: "Electronice"})})
//     .then(function () { return Category.create({name: "Electrocasnice"})})
//     .then(function () { return Category.create({name: "Altele"})});


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

app.get('/products/:id', function(request, response){
    Product.find({
        where: {id: request.params.id},
        include: [Category]
    }).then(function(products){
        response.status(200).send(products);
    });
});

app.get('/productsWithCategory', function(request,response){
    Product.findAll({
        include: [Category]
    }).then(function(products){
        response.status(200).send(products);
    });
});

app.put('/products/:id', function(request, response){
   Product.find({
       where: {id :request.params.id}
       })
//   .on('success', function(product){
  .then(function(product){
       if(product){
           product.updateAttributes(request.body)
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
   });
});

app.get('/productsByCategoryId/:id', function(request,response){
    Product.findAll({
        where: {categoryId : request.params.id},
    }).then(function(products){
        response.status(200).send(products);
    });
});

//Categories
app.get('/categories', function(request, response){
    Category.findAll().then(function(categories){
        response.status(200).send(categories);
    });
});

app.get('/categoryProducts', function(request,response){
    Category.findAll({
        include: [Product]
    }).then(function(categories){
        response.status(200).send(categories);
    });
});
